function getActiveMachines() {
    try {
        #MySql Environment Variables
        $MySQLHost = "localhost"
        $MySQLAdminUserName = "root"
        $MySQLAdminPassword = "password1"
        $MySQLDatabase = "lab_reservation"

        #Open MySql Connection
        $ConnectionString = "server=" + $MySQLHost + ";port=3306;uid=" + $MySQLAdminUserName + ";pwd=" + $MySQLAdminPassword + ";database="+$MySQLDatabase
        [void][system.reflection.Assembly]::LoadFrom("C:\Program Files (x86)\MySQL\MySQL Connector Net 6.8.3\Assemblies\v4.5\MySql.Data.dll")
        $Connection = New-Object MySql.Data.MySqlClient.MySqlConnection
        $Connection.ConnectionString = $ConnectionString
        $Connection.Open()

        #Get a list of all Servers
        $Query = "SELECT name from computers"
        $Command = New-Object MySql.Data.MySqlClient.MySqlCommand($Query, $Connection)
        $DataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter($Command)
        $DataSet = New-Object System.Data.DataSet
        $DataAdapter.Fill($DataSet)

        #Iterate through stations and update computer table
        Foreach($station in $DataSet.Tables[0]){
            $s = $station.name
            if(Test-Connection -Cn $s -BufferSize 16 -Count 1 -ea 0 -Quiet){
                setComputerProperties($s);
            } else {
                setComputerNotPowered($s);
            }
        }
    
        #Close MySql Connection
        $Connection.Close()
    } catch {
        LogWrite "Exception Type: $_.Exception.GetType().FullName"
        LogWrite "Exception Message: $_.Exception.Message"
    } finally {
        $Connection.Close()
    }

}

function setComputerProperties ($s) {
    try {
        #LogWrite -foregroundcolor green "$s is Responding";

        #Getting Memory Usage
        $totalMemory = Get-WmiObject Win32_ComputerSystem -ComputerName $s | Select-Object TotalPhysicalMemory
        $available = Get-WmiObject Win32_PerfRawData_PerfOS_Memory -computername $s | Select-Object AvailableBytes
        $percent = (100 - ([Math]::Round((($available.AvailableBytes / $totalMemory.TotalPhysicalMemory) * 100))))

        #Check if user is logged in
        $userString = (Get-WmiObject Win32_ComputerSystem -ComputerName $s | Select-Object username).username
        if($userString){
            #$userString = $userString.split("\\")[1]
            $userString = 'true';
        } else {
            $userString = 'false';
            #$userString = "None"
        }

        #Prepare Query and execute
        $updatedAt = "{0:yyyy-MM-ddTHH:mm:ss}" -f (get-date)
        $Query = "UPDATE computers SET isPowered=true, isLoggedIn=$userString, memoryUsage=$percent, updatedAt='$updatedAt' WHERE name='$s'"
        $Command = New-Object MySql.Data.MySqlClient.MySqlCommand($Query, $Connection)
        $DataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter($Command)
        $DataSet = New-Object System.Data.DataSet
        $DataAdapter.Fill($DataSet) | Out-Null
        $DataSet.Tables[0]
    } catch {
        LogWrite "Exception Type: $_.Exception.GetType().FullName"
        LogWrite "Exception Message: $_.Exception.Message"
    }

}

function setComputerNotPowered ($s) {
    try {
        #LogWrite -foregroundcolor red "$s is not responding"

        #Prepare Query and execute
        $Query = "UPDATE computers SET isPowered=false, isLoggedIn=false, memoryUsage=0 WHERE name='$s'"
        LogWrite $Query
        $Command = New-Object MySql.Data.MySqlClient.MySqlCommand($Query, $Connection)
        $DataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter($Command)
        $DataSet = New-Object System.Data.DataSet
        $DataAdapter.Fill($DataSet) | Out-Null
        $DataSet.Tables[0]
    } catch {
        LogWrite "Exception Type: $_.Exception.GetType().FullName"
        LogWrite "Exception Message: $_.Exception.Message"
    }
}

Function LogWrite
{
   Param ([string]$logstring)

   Add-content "C:\Users\howards4\Documents\labScraper.log" -value $logstring
}

getActiveMachines;
