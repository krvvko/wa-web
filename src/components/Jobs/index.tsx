import React, {useEffect, useState} from "react";
import axios from "axios";
import './index.css';
import {config} from "../../utils/config";
import defaultPFP from './../../media/png/user-pfp.png';
import JobElement from "./JobElement";
import {Job, JobDataFromServer} from "../../utils/interfaces";


const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get<JobDataFromServer[]>(`${config.serverURL}/jobs`);
            if (response.status === 200) {
                setJobs(transformJobData(response.data));
            }
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        }
    };
    const transformJobData = (jobDataArray: JobDataFromServer[]): Job[] => {
        return jobDataArray.map(({ id, pfp, picture, name, date, description, requirements, contacts }) => ({
            id,
            profilePicture: pfp || defaultPFP,
            picture: picture || null,
            name: name || 'Unnamed Job',
            date: new Date(Number(date)) || new Date(),
            description: description || 'No description available.',
            requirements: JSON.parse(requirements) || [],
            contacts: JSON.parse(contacts) || []
        }));
    };

    useEffect(() => {
        fetchJobs().then(() : void => console.log('jobs fetched')).catch((e): void => console.log(e));
    }, []);

    return (
        <div className="jobs-container">
            {jobs.length >= 1 && jobs.map((job: Job): React.ReactNode => (
                <JobElement
                    id={job.id}
                    profilePicture={job.profilePicture}
                    picture={job.picture}
                    name={job.name}
                    date={job.date}
                    description={job.description}
                    requirements={job.requirements}
                    contacts={job.contacts} />
            ))}
        </div>
    )
}

export default Jobs;