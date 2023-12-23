import React from "react";

const determineContactType = (contact: string) => {
    if (contact.includes('@')) {
        return `mailto:${contact}`;
    } else if (contact.match(/^\+?\d+$/)) {
        return `tel:${contact}`;
    }
    return contact;
};

const JobContactElement = ({ contacts }: { contacts: string[] }) => {
    return (
        <>
            {contacts.map((contact, index) => {
                const href = determineContactType(contact);
                return (
                    <a href={href} rel="noreferrer" target="_blank" className="job-contact" key={index}>{contact}</a>
                );
            })}
        </>

    )
}

export default JobContactElement;