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

initialiseEnquiryForm();