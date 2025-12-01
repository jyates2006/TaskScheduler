function generateXML(data) {
let triggerXML = "";


if (data.triggerType === "daily") {
triggerXML = `
<Trigger>
<CalendarTrigger>
<StartBoundary>${data.startDate}T${data.startTime}:00</StartBoundary>
<ScheduleByDay>
<DaysInterval>1</DaysInterval>
</ScheduleByDay>
</CalendarTrigger>
</Trigger>`;
} else if (data.triggerType === "logon") {
triggerXML = `
<Trigger>
<LogonTrigger />
</Trigger>`;
} else if (data.triggerType === "startup") {
triggerXML = `
<Trigger>
<BootTrigger />
</Trigger>`;
}


return `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.4" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
<RegistrationInfo>
<Date>${new Date().toISOString()}</Date>
<Author>${data.author}</Author>
<Description>${data.description}</Description>
</RegistrationInfo>
<Triggers>
${triggerXML}
</Triggers>
<Principals>
<Principal id="Author">
<LogonType>Password</LogonType>
<RunLevel>LeastPrivilege</RunLevel>
</Principal>
</Principals>
<Settings>
<MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
<DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
<StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
<ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
</Settings>
<Actions Context="Author">
<Exec>
<Command>${data.programPath}</Command>
<Arguments>${data.arguments}</Arguments>
</Exec>
</Actions>
</Task>`;
}


// UI logic
const triggerSelect = document.getElementById("triggerType");
const dailyOptions = document.getElementById("dailyOptions");


triggerSelect.addEventListener("change", () => {
dailyOptions.classList.toggle("hidden", triggerSelect.value !== "daily");
});


// Form submission
const form = document.getElementById("taskForm");
const output = document.getElementById("output");
const downloadBtn = document.getElementById("downloadBtn");


form.addEventListener("submit", (e) => {
e.preventDefault();


const data = {
taskName: document.getElementById("taskName").value,
description: document.getElementById("description").value,
author: document.getElementById("author").value,
});
