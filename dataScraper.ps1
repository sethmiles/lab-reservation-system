
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
    $percent = ([Math]::Round((($available.AvailableBytes / $totalMemory.TotalPhysicalMemory) * 100)))
    
    Write-Host "$percent% available physical memory"

    #Check if user is logged in



}

function setComputerNotPowered ($station) {
    Write-Host -foregroundcolor red "$station is not responding"
}

getActiveMachines;
