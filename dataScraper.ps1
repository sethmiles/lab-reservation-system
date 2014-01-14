#MySql Environment Variables
$dbServer = "172.16.1.78:3306"
$username = "lab_admin"
$password = "password1"
$database = "lab-reservation"

## The path will need to match the mysql connector you downloaded
[void][system.reflection.Assembly]::LoadFrom("C:\Program Files (x86)\MySQL\MySQL Connector Net 6.7.4\Assemblies\v4.5\MySql.Data.dll")

function global:Set-SqlConnection () {
    $SqlConnection.ConnectionString = "server=$server;user id=$username;password=$password;database=$database;pooling=false;Allow Zero Datetime=True;"
}

function global:Get-SqlDataTable( $Query = $(if (-not ($Query -gt $null)) {Read-Host "Query to run"}) ) {
	if (-not ($SqlConnection.State -like "Open")) { $SqlConnection.Open() }
	$SqlCmd = New-Object MySql.Data.MySqlClient.MySqlCommand $Query, $SqlConnection
	$SqlAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter
	$SqlAdapter.SelectCommand = $SqlCmd
	$DataSet = New-Object System.Data.DataSet
	$SqlAdapter.Fill($DataSet) | Out-Null
	$SqlConnection.Close()
	return $DataSet.Tables[0]
}

Set-Variable SqlConnection (New-Object MySql.Data.MySqlClient.MySqlConnection) -Scope Global -Option AllScope -Description "Personal variable for Sql Query functions"
Set-SqlConnection $server $username $password $database

$mysqltest = Get-SqlDataTable 'SHOW STATUS'

echo $mysqltest


function getActiveMachines() {
    $servers = "Station01","Station02","Station03","Station04","Station05","Station06", "Station07","Station08","Station09",
                "Station10","Station11","Station12","Station13","Station14","Station15","Station16","Station17","Station18",
                "Station19","Station20","Station21","Station22","Station23","Station23","Station25","Station26","Station27",
                "Station28","Station29","Station30"

    Foreach($s in $servers){
        if(Test-Connection -Cn $s -BufferSize 16 -Count 1 -ea 0 -Quiet){
            setComputerProperties($s);
        } else {
            setComputerNotPowered($s);
        }
    }
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
        $userString = "No one"
    }
    Write-Host "$userString is currently logged on"
}

function setComputerNotPowered ($station) {
    Write-Host -foregroundcolor red "$station is not responding"
}

#getActiveMachines;
