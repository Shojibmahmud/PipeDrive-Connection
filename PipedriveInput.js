import axios from "axios";

async function createJob() {
	// Retrieve form data
	const form = document.getElementById("job-form");
	const formData = new FormData(form);
	let isFormValid = true;

	// Validate "Customer Details" section
	const customerDetailsSection = document.getElementById("customer-details");
	const firstName = formData.get("first-name");
	const lastName = formData.get("last-name");
	const phone = formData.get("phone");
	const email = formData.get("email");

	const customerDetailsWarning =
		customerDetailsSection.querySelector(".warning");
	customerDetailsWarning.innerHTML = "";

	if (!firstName || !lastName || !phone || !email) {
		isFormValid = false;
		customerDetailsWarning.innerHTML = "Please fill in all the fields.";
	}

	// Validate "Job Details" section
	const jobDetailsSection = document.getElementById("job-details");
	const jobType = formData.get("job-type");
	const jobSource = formData.get("job-source");
	const jobDescription = formData.get("job-description");

	const jobDetailsWarning = jobDetailsSection.querySelector(".warning");
	jobDetailsWarning.innerHTML = "";

	if (!jobType || !jobSource || !jobDescription) {
		isFormValid = false;
		jobDetailsWarning.innerHTML = "Please fill in all the fields.";
	}

	// Validate "Service Location" section
	const serviceLocationSection = document.getElementById("service-location");
	const address = formData.get("address");
	const city = formData.get("city");
	const state = formData.get("state");
	const zipCode = formData.get("zip-code");
	const area = formData.get("area");

	const serviceLocationWarning =
		serviceLocationSection.querySelector(".warning");
	serviceLocationWarning.innerHTML = "";

	if (!address || !city || !state || !zipCode || !area) {
		isFormValid = false;
		serviceLocationWarning.innerHTML = "Please fill in all the fields.";
	}

	// Validate "Schedule" section
	const scheduleSection = document.getElementById("schedule");
	const startDate = formData.get("start-date");
	const startTime = formData.get("start-time");
	const endTime = formData.get("end-time");
	const testSelect = formData.get("test-select");

	const scheduleWarning = scheduleSection.querySelector(".warning");
	scheduleWarning.innerHTML = "";

	if (!startDate || !startTime || !endTime || !testSelect) {
		isFormValid = false;
		scheduleWarning.innerHTML = "Please fill in all the fields.";
	}

	if (isFormValid) {
		try {
			// Send data to Pipedrive API
			const response = await axios.post(
				"https://api.pipedrive.com/v1/deals",
				{
					title: `${firstName} ${lastName}`,
					person_id: null,
					custom_fields: {
						// Customize the custom fields as needed
						CF_FIELD1: jobType,
						CF_FIELD2: jobSource,
						CF_FIELD3: jobDescription,
						CF_FIELD4: address,
						CF_FIELD5: city,
						CF_FIELD6: state,
						CF_FIELD7: zipCode,
						CF_FIELD8: area,
						CF_FIELD9: startDate,
						CF_FIELD10: startTime,
						CF_FIELD11: endTime,
					},
				},
				{
					params: {
						api_token: "e136f3ee39fc93a171abfac68a83b80558c648bf",
					},
				},
			);

			console.log("Deal created successfully:", response.data);
			// Perform any additional actions or handle success
		} catch (error) {
			console.error("Error creating deal:", error);
			// Handle error
		}
	}
}

function clearForm() {
	document.getElementById("job-form").reset();
	const warningElements = document.querySelectorAll(".warning");
	warningElements.forEach((warning) => {
		warning.innerHTML = "";
	});
}
