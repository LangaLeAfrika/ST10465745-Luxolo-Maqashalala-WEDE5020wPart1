"use strict";

// Programme information is stored separately from its HTML presentation.
const programmes = [
    {
        name: "Computer Literacy",
        description:
            "Learn essential digital skills, software navigation, and basic troubleshooting."
    },
    {
        name: "Job Readiness",
        description:
            "Master CV writing, interview techniques, and professional workplace communication."
    },
    {
        name: "Entrepreneurship",
        description:
            "Discover how to start, manage, and grow your own small business."
    }
];

function initialiseProgrammeSearch() {
    const searchInput = document.querySelector("#programme-search");
    const sortSelect = document.querySelector("#programme-sort");
    const programmeList = document.querySelector("#programme-list");
    const programmeCount = document.querySelector("#programme-count");

    // Other pages may use this script without having programme controls.
    if (!searchInput || !sortSelect || !programmeList || !programmeCount) {
        return;
    }

    function renderProgrammes() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Match the search against both the name and description.
        const matches = programmes.filter((programme) => {
            const searchableText =
                `${programme.name} ${programme.description}`.toLowerCase();

            return searchableText.includes(searchTerm);
        });

        // Sort the filtered results without changing the original array.
        matches.sort((first, second) => {
            if (sortSelect.value === "za") {
                return second.name.localeCompare(first.name);
            }

            return first.name.localeCompare(second.name);
        });

        // Remove the old results before displaying the updated results.
        programmeList.replaceChildren();

        programmeCount.textContent =
            `${matches.length} programme${matches.length === 1 ? "" : "s"} found.`;

        if (matches.length === 0) {
            const message = document.createElement("p");
            message.className = "programme-empty";
            message.textContent =
                "No programmes match your search. Try another word or clear the search.";

            programmeList.append(message);
            return;
        }

        const fragment = document.createDocumentFragment();

        matches.forEach((programme) => {
            const card = document.createElement("article");
            card.className = "programme-card";

            const heading = document.createElement("h3");
            heading.textContent = programme.name;

            const description = document.createElement("p");
            description.textContent = programme.description;

            const link = document.createElement("a");
            link.href = "registration.html";
            link.textContent = `Register interest in ${programme.name}`;

            card.append(heading, description, link);
            fragment.append(card);
        });

        programmeList.append(fragment);
    }

    // Refresh the results whenever the user types or changes the sorting.
    searchInput.addEventListener("input", renderProgrammes);
    sortSelect.addEventListener("change", renderProgrammes);

    // Display all programmes when the page first loads.
    renderProgrammes();
}

initialiseProgrammeSearch();
function initialiseProgrammeFaqs() {
    const faqItems = document.querySelectorAll(".programme-faq details");

    faqItems.forEach((selectedItem) => {
        selectedItem.addEventListener("toggle", () => {
            // Only close other answers when this answer has been opened.
            if (!selectedItem.open) {
                return;
            }

            faqItems.forEach((otherItem) => {
                if (otherItem !== selectedItem) {
                    otherItem.open = false;
                }
            });
        });
    });
}

    initialiseProgrammeFaqs();
    function initialiseGallery() {
        const lightbox = document.querySelector("#image-lightbox");
        const largeImage = document.querySelector("#lightbox-image");
        const caption = document.querySelector("#lightbox-caption");
        const galleryLinks = document.querySelectorAll(".gallery-link");

        if (!lightbox || !largeImage || !caption) {
            return;
        }

        // Keep normal image links working if dialog support is unavailable.
        if (typeof lightbox.showModal !== "function") {
            return;
        }

        galleryLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                // Preserve Ctrl/Cmd-click and other modified link actions.
                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }

                const thumbnail = link.querySelector("img");

                if (!thumbnail) {
                    return;
                }

                event.preventDefault();

                largeImage.src = link.href;
                largeImage.alt = thumbnail.alt;
                caption.textContent = thumbnail.alt;

                lightbox.showModal();
            });
        });
    }

    initialiseGallery();
    function initialiseEnquiryForm() {
    const form = document.querySelector("#enquiry-form");

    if (!form) {
        return;
    }

    const nameInput = document.querySelector("#enquiry-name");
    const emailInput = document.querySelector("#enquiry-email");
    const interestInput = document.querySelector("#enquiry-interest");
    const messageInput = document.querySelector("#enquiry-message");
    const checkButton = document.querySelector("#enquiry-check");
    const result = document.querySelector("#enquiry-result");

    if (
        !nameInput ||
        !emailInput ||
        !interestInput ||
        !messageInput ||
        !checkButton ||
        !result
    ) {
        return;
    }

    const responses = {
        computer:
            "Computer Literacy covers essential digital skills, software navigation, and basic troubleshooting.",
        job:
            "Job Readiness covers CV preparation, interview techniques, and workplace communication.",
        business:
            "Entrepreneurship introduces starting, managing, and growing a small business.",
        volunteer:
            "For a volunteering enquiry, describe the skills you could share and the times you would be available.",
        sponsor:
            "For a sponsorship enquiry, describe the support you could offer, such as equipment, learning resources, or funding."
    };

    // We trigger the browser's validation messages from JavaScript.
    form.noValidate = true;

    form.addEventListener("submit", (event) => {
        // This step checks the enquiry locally; it does not send it.
        event.preventDefault();
        result.replaceChildren();

        nameInput.value = nameInput.value.trim();
        emailInput.value = emailInput.value.trim();
        messageInput.value = messageInput.value.trim();

        nameInput.setCustomValidity(
            nameInput.value.length < 2
                ? "Please enter a name containing at least 2 characters."
                : ""
        );

        messageInput.setCustomValidity(
            messageInput.value.length < 10
                ? "Please enter at least 10 characters explaining your enquiry."
                : ""
        );

        interestInput.setCustomValidity(
            Object.hasOwn(responses, interestInput.value)
                ? ""
                : "Please select an enquiry option."
        );

        // Checks required fields, email format, and custom rules.
        if (!form.reportValidity()) {
            return;
        }

        const heading = document.createElement("h3");
        heading.textContent = "Your enquiry details are valid";

        const guidance = document.createElement("p");
        guidance.textContent = responses[interestInput.value];

        const availability = document.createElement("p");
        availability.textContent =
            "Dates, fees, available places, and participation arrangements must be confirmed with the Hub.";

        const notice = document.createElement("p");
        notice.textContent =
            "This is a local preview. Your enquiry has not been sent or saved.";

        result.append(heading, guidance, availability, notice);
    });

    // Remove old validation messages as the user corrects a field.
    form.addEventListener("input", (event) => {
        if (typeof event.target.setCustomValidity === "function") {
            event.target.setCustomValidity("");
        }

        result.replaceChildren();
    });

    checkButton.disabled = false;
}

function initialiseEnquiryForm() {
    const form = document.querySelector("#enquiry-form");

    if (!form) {
        return;
    }

    const nameInput = document.querySelector("#enquiry-name");
    const emailInput = document.querySelector("#enquiry-email");
    const interestInput = document.querySelector("#enquiry-interest");
    const messageInput = document.querySelector("#enquiry-message");
    const submitButton = document.querySelector("#enquiry-check");
    const result = document.querySelector("#enquiry-result");

    if (
        !nameInput ||
        !emailInput ||
        !interestInput ||
        !messageInput ||
        !submitButton ||
        !result
    ) {
        return;
    }

    const responses = {
        computer:
            "Computer Literacy covers essential digital skills, software navigation, and basic troubleshooting.",
        job:
            "Job Readiness covers CV preparation, interview techniques, and workplace communication.",
        business:
            "Entrepreneurship introduces starting, managing, and growing a small business.",
        volunteer:
            "Your volunteering enquiry can help us discuss your skills and availability.",
        sponsor:
            "Your sponsorship enquiry can help us discuss the support you would like to offer."
    };

    let isSending = false;
    form.noValidate = true;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Prevent repeated clicks from creating simultaneous submissions.
        if (isSending) {
            return;
        }

        result.replaceChildren();

        nameInput.value = nameInput.value.trim();
        emailInput.value = emailInput.value.trim();
        messageInput.value = messageInput.value.trim();

        nameInput.setCustomValidity(
            nameInput.value.length < 2
                ? "Please enter a name containing at least 2 characters."
                : ""
        );

        messageInput.setCustomValidity(
            messageInput.value.length < 10
                ? "Please enter at least 10 characters explaining your enquiry."
                : ""
        );

        interestInput.setCustomValidity(
            Object.hasOwn(responses, interestInput.value)
                ? ""
                : "Please select an enquiry option."
        );

        if (!form.reportValidity()) {
            return;
        }

        // Capture the submitted details before disabling the fields.
        const selectedInterest = interestInput.value;
        const formData = new FormData(form);

        formData.set(
            "interest",
            interestInput.options[interestInput.selectedIndex].text
        );

        const controls = Array.from(form.elements);
        const previousDisabledStates =
            controls.map((control) => control.disabled);

        isSending = true;
        controls.forEach((control) => {
            control.disabled = true;
        });

        submitButton.textContent = "Sending…";
        form.setAttribute("aria-busy", "true");
        result.textContent = "Sending your enquiry. Please wait.";

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                },
                signal: controller.signal
            });

            if (!response.ok) {
                result.textContent =
                    "The submission service did not accept your enquiry. " +
                    "Your details have been kept. Please try again later " +
                    "or use the Contact page.";
                return;
            }

            const heading = document.createElement("h3");
            heading.textContent = "Enquiry submitted successfully";

            const confirmation = document.createElement("p");
            confirmation.textContent =
                "The submission service has accepted your enquiry.";

            const guidance = document.createElement("p");
            guidance.textContent = responses[selectedInterest];

            const availability = document.createElement("p");
            availability.textContent =
                "Dates, fees, available places, and participation " +
                "arrangements still need confirmation from the Hub.";

            result.replaceChildren(
                heading,
                confirmation,
                guidance,
                availability
            );

            // Clear fields only after a successful server response.
            form.reset();
        } catch (error) {
            result.textContent =
                "We could not confirm whether your enquiry was received. " +
                "Your details have been kept. Check your connection before " +
                "trying again; retrying may create a duplicate enquiry.";
        } finally {
            clearTimeout(timeoutId);

            controls.forEach((control, index) => {
                control.disabled = previousDisabledStates[index];
            });

            submitButton.textContent = "Send enquiry";
            form.removeAttribute("aria-busy");
            isSending = false;
        }
    });

    form.addEventListener("input", (event) => {
        if (typeof event.target.setCustomValidity === "function") {
            event.target.setCustomValidity("");
        }

        result.replaceChildren();
    });

    submitButton.disabled = false;
}

initialiseEnquiryForm();
function initialiseTrainingMap() {
    const mapContainer = document.querySelector("#training-map");
    const mapStatus = document.querySelector("#map-status");

    // Other pages do not contain a map.
    if (!mapContainer || !mapStatus) return;

    if (typeof window.L === "undefined") {
        mapStatus.textContent =
            "The map could not load. Please use the Google Maps link below.";
        return;
    }

    // Approximate ETC campus location: latitude, longitude.
    const location = [-33.8826, 25.56099];

    const map = L.map(mapContainer, {
        scrollWheelZoom: false
    }).setView(location, 16);

    const tiles = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">' +
                "OpenStreetMap</a> contributors"
        }
    );

    tiles.on("tileerror", function () {
        mapStatus.textContent =
            "Some map images could not load. Check your connection " +
            "or use the Google Maps link below.";
    });

    tiles.addTo(map);

    const popup = document.createElement("p");
    popup.textContent =
        "Eastcape Training Centre (ETC), Spondo Street, Struandale. " +
        "Proposed Skills Hub venue — approximate location.";

    L.marker(location, {
        title: "Eastcape Training Centre",
        alt: "Approximate ETC campus location"
    })
        .addTo(map)
        .bindPopup(popup);
}

initialiseTrainingMap();