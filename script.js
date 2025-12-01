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
});
