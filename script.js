function generateXML(data) {
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
triggerType: document.getElementById("triggerType").value,
startTime: document.getElementById("startTime").value || "00:00",
startDate: new Date().toISOString().split("T")[0],
programPath: document.getElementById("programPath").value,
arguments: document.getElementById("arguments").value,
};


const xml = generateXML(data);
output.value = xml;
downloadBtn.classList.remove("hidden");
});


// Download XML
function download(filename, text) {
const blob = new Blob([text], {type: "application/xml"});
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = filename;
a.click();
}


downloadBtn.addEventListener("click", () => {
download("task.xml", output.value);
});
