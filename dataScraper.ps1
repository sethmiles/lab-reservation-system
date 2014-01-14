
function getActiveMachines() {
    $servers = "Station01","Station02","Station03","Station04","Station05","Station06", "Station07","Station08","Station09",
                "Station10","Station11","Station12","Station13","Station14","Station15","Station16","Station17","Station18",
                "Station19","Station20","Station21","Station22","Station23","Station23","Station25","Station26","Station27",
                "Station28","Station29","Station30";

    #MySql Environment Variables
    $MySQLHost = "172.16.1.78"
    $MySQLAdminUserName = "root"
    $MySQLAdminPassword = "password1"
    $MySQLDatabase = "lab_reservation"

    $ConnectionString = "server=" + $MySQLHost + ";port=3306;uid=" + $MySQLAdminUserName + ";pwd=" + $MySQLAdminPassword + ";database="+$MySQLDatabase
    [void][system.reflection.Assembly]::LoadFrom("C:\Program Files (x86)\MySQL\MySQL Connector Net 6.7.4\Assemblies\v4.5\MySql.Data.dll")
    $Connection = New-Object MySql.Data.MySqlClient.MySqlConnection
    $Connection.ConnectionString = $ConnectionString
    $Connection.Open()

    Foreach($s in $servers){
        if(Test-Connection -Cn $s -BufferSize 16 -Count 1 -ea 0 -Quiet){
            setComputerProperties($s);
        } else {
            setComputerNotPowered($s);
        }
    }

    $Connection.Close()

}

function setComputerProperties ($station) {
    Write-Host -foregroundcolor green "$s is Responding";

    #Getting Memory Usage
    $totalMemory = Get-WmiObject Win32_ComputerSystem -ComputerName $station | Select-Object TotalPhysicalMemory
    $available = Get-WmiObject Win32_PerfRawData_PerfOS_Memory -computername $station | Select-Object AvailableBytes
    $percent = (100 - ([Math]::Round((($available.AvailableBytes / $totalMemory.TotalPhysicalMemory) * 100))))
    
    Write-Host "$percent% of physical memory is in use"

    #Check if user is logged in
    $userString = (Get-WmiObject Win32_ComputerSystem -ComputerName $station | Select-Object username).username
    if($userString){
        $userString = $userString.split("\\")[1]
    } else {
        $userString = "None"
    }

    $Query = "INSERT INTO computers (isPowered, isLoggedIn, memoryUsage) VALUES(true, true, $percent);"
    Write-Host $Query
    $Command = New-Object MySql.Data.MySqlClient.MySqlCommand($Query, $Connection)
    $DataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter($Command)
    Write-Host "$userString is currently logged on"
}

function setComputerNotPowered ($station) {
    Write-Host -foregroundcolor red "$station is not responding"
    $Query = "INSERT INTO computers (isPowered, isLoggedIn, memoryUsage) VALUES(false, false, 0);"
    $Command = New-Object MySql.Data.MySqlClient.MySqlCommand($Query, $Connection)
    $DataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter($Command)
}

getActiveMachines;
