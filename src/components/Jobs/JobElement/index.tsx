import React from "react";
import './index.css';
import {Job} from "../../../utils/interfaces";
import JobContactElement from "./JobContactElement";


const JobElement: React.FC<Job> = ({id, profilePicture, picture, name, date, description, requirements, contacts}) => {
    return (
        <div id={`result${id}`} className="job-element">
            <div className="job-top">
                <img src={profilePicture} alt="job pfp"/>
                <div className="job-top-text">
                    <span>{name}</span>
                    <span>{date.toLocaleDateString("en-US", {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}</span>
                </div>
            </div>
            <span className="job-desc">{description}</span>
            {picture && <img className="job-picture" src={picture} alt="job picture"/>}
            <div className="job-contacts">
                {contacts.length >= 1 ? (
                    <>
                        <span>Contacts:</span>
                        <JobContactElement contacts={contacts}/>
                    </>
                ) : (
                    <span className="job-contact">No specified contacts</span>
                )}
            </div>
            <div className="job-requirements">
                {requirements.length >= 1 ? (
                    <>
                        <span>Requirements:</span>
                        {requirements.map((requirement: string) => (
                            <span className="job-requirement">{requirement}</span>
                        ))}
                    </>
                ) : (
                    <span className="job-contact">No job requirements specified</span>
                )}
            </div>
        </div>
    )
}

export default JobElement;