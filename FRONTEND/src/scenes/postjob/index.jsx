import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './index.css';
import CreatableSelect from 'react-select/creatable';
import axiosInstance from '../../utilis/ApiRequest';
import { Box, useTheme} from '@mui/material';
import { tokens } from "../../theme";
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';


const CreateJob = () => {
    const theme = useTheme();
    const [] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            console.log("Submitting Form Data: ", data); // Debugging Log

            // Convert selected skills to an array of values (if needed)
            data.skills = selectedOption ? selectedOption.map(skill => skill.value) : [];

            console.log("Formatted Data with Skills: ", data);

            // Make API request
            const response = await axiosInstance.post('http://localhost:5000/api/add_job', data);

            console.log('Job created successfully:', response.data);

            // Show success message
            setDialogContent('Job posted successfully!');
            setDialogOpen(true);

            // Reset form after success
            reset();

        } catch (error) {
            console.error('Error creating job:', error.message);
        }
    };

    const handleSendEmail = async () => {
        try {
            // Fetch email addresses from your backend API
            const response = await axiosInstance.get('/subscribers');
            const emails = response.data.map(subscription => subscription.email);

            // Construct the email data
            const emailData = {
                to: emails.join(','), // Comma-separated list of email addresses
                subject: 'Your Subject Here',
                text: 'Your Email Text Here',
            };

            // Send the email
            const sendEmailResponse = await axiosInstance.post('http://localhost:5000/api/send-email', emailData);
            console.log('Email sent successfully:', sendEmailResponse.data);

            // Open the dialog with success message
            setDialogContent('Email sent to all subscribers successfully!');
            alert("Submited")
            setDialogOpen(true);
        } catch (error) {
            console.error('Error sending email to subscribers:', error);
        }
    };


    const options = [
        { value: "JavaScript", label: "JavaScript" },
        { value: "C++", label: "C++" },
        { value: "C#", label: "C#" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "React.js", label: "React.js" },
        { value: "Node.js", label: "Node.js" },
        { value: "Python", label: "Python" },
        { value: "AngularJS", label: "AngularJS" },
        { value: "Java", label: "Java" },
        { value: "PHP", label: "PHP" },
        { value: "Laravel", label: "Laravel" },
        { value: "Django", label: "Django" },
        { value: "Flask", label: "Flask" },
        { value: "Ruby on Rails", label: "Ruby on Rails" },
        { value: "ASP.NET", label: "ASP.NET" },
        { value: "Flutter", label: "Flutter" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "MySQL", label: "MySQL" },
        { value: "PostgreSQL", label: "PostgreSQL" },
        { value: "SQLite", label: "SQLite" },
        { value: "Oracle Database", label: "Oracle Database" },
        { value: "Express.js", label: "Express.js" },
        { value: "Spring Boot", label: "Spring Boot" },
        { value: "Kotlin", label: "Kotlin" },
        { value: "Swift", label: "Swift" },
        { value: "Go", label: "Go" },
        { value: "Rust", label: "Rust" },
        { value: "TypeScript", label: "TypeScript" },
        { value: "GraphQL", label: "GraphQL" },
        { value: "Docker", label: "Docker" },
        { value: "Kubernetes", label: "Kubernetes" },
        { value: "Terraform", label: "Terraform" },
        { value: "AWS", label: "AWS" },
        { value: "Azure", label: "Azure" },
        { value: "Google Cloud", label: "Google Cloud" },
        { value: "UI/UX", label: "UI/UX" },
        { value: "Jenkins", label: "Jenkins" },
        { value: "Git", label: "Git" },
        { value: "DevOps", label: "DevOps" },
        { value: "Cybersecurity", label: "Cybersecurity" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Data Science", label: "Data Science" },
        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
        { value: "Big Data", label: "Big Data" },
        { value: "Blockchain", label: "Blockchain" }
    ];
    



    return (
        <Box style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            width: "100%", // Set the width to 100% to cover the entire row
            boxSizing: "border-box", // Include padding and border in the total width/height
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

        }}>
            {/* form */}
            <div style={{
                paddingTop: "2rem",
                paddingBottom: "2rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                background: "#FAFAFA",
                margin: "20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%", // Set the width to 100% to cover the entire row
                boxSizing: "border-box", // Include padding and border in the total width/height
                maxHeight: "600px", // Set a max height (adjust as needed)
                overflowY: "auto",  // Enable vertical scrolling only within this div
            }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: "#F5F5F5" }}>
                    {/* row1 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Title</label>
                            <input
                                type="text"
                                placeholder='Ex: Web Developer'
                                {...register("jobTitle")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Company Name</label>
                            <input
                                type="text"
                                placeholder='Ex: Microsoft'
                                {...register("companyName")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%",
                                    fontSize: "1rem", marginTop: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                    </div>
                    {/* row 2 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Minimum Salary</label>
                            <input
                                type="text"
                                placeholder='Rs.20k'
                                {...register("minPrice")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px", marginTop: "1rem",
                                    width: "100%",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Maximum Salary</label>
                            <input
                                type="text"
                                placeholder='Rs.120k'
                                {...register("maxPrice")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px", marginTop: "1rem",
                                    padding: "12px",
                                    width: "100%",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                    </div>
                    {/* row3 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ fontSize: "1.2rem", color: "#535353" }}>Salary Type</label>
                            <select {...register("salaryType")} className="create-job-input" style={{
                                border: "none", borderRadius: "8px",
                                padding: "12px",
                                width: "100%",
                                fontSize: "1rem", marginTop: "1rem"
                            }}>
                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>

                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Location</label>
                            <input
                                type="text"
                                placeholder='Ex:Islamabad'
                                {...register("jobLocation")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                    </div>

                    {/* row 4 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Posting Date</label>
                            <input
                                type="date"
                                placeholder='Ex: 2023-11-03'
                                {...register("postingDate")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>End Date</label>
                            <input
                                type="date"
                                placeholder='Ex: 2023-11-03'
                                {...register("endingDate")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>

                    </div>
                    {/* row 5 */}
                    <div style={{ marginTop: "1rem" }}>
                        <label style={{ marginBottom: "4rem", fontSize: "1.2rem", color: "#535353" }}>    Required Skill Sets:</label>
                        <CreatableSelect
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            className='create-job-input' styles={{ paddingTop: "3rem", paddingBottom: "1rem", marginTop: "3rem" }} />

                    </div>
                    {/* row 6 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Company Logo</label>
                            <input
                                type="url"
                                placeholder='Paste your company logo URL : http://weshare.com/img1'
                                {...register("companyLogo")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ fontSize: "1.2rem", color: "#535353" }}>Employment Type</label>
                            <select {...register("employmentType")} className="create-job-input" style={{
                                border: "none", borderRadius: "8px",
                                padding: "12px",
                                width: "100%",
                                fontSize: "1rem", marginTop: "1rem"
                            }}>
                                <option value="">Select your employment type</option>
                                <option value="Full-time">Full-Time</option>
                                <option value="Part-time">Part-Time</option>
                                <option value="Temporary">Temporary</option>
                            </select>

                        </div>

                    </div>
                    <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                        <label style={{ fontSize: "1.2rem", color: "#535353" }}>Experience Level</label>
                        <select {...register("experienceLevel")} className="create-job-input" style={{
                            border: "none", borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                            fontSize: "1rem", marginTop: "1rem"
                        }}>
                            <option value="">Select your experience level</option>
                            <option value="NoExperience">No Experience</option>
                            <option value="NoExperience">1 year Experience</option>
                            <option value="NoExperience">1 to 2year Experience</option>
                            <option value="NoExperience">2 to 3year Experience</option>
                            <option value="NoExperience">3 to 5year Experience</option>
                            <option value="Internship">Internship</option>
                            <option value="Work remotely">Work remotely</option>
                        </select>

                    </div>
                    {/* row 7 */}
                    <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Description</label>
                        <textarea {...register("description")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem",
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",

                        }}
                            row={6}
                            defaultValue={"Join our dynamic team and contribute to exciting projects.!"}

                            placeholder='Job Description' />
                    </div>


                    {/* row 9 - Additional Fields */}
                    <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Benefits</label>
                        <textarea  {...register("jobBenefits")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem",
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",

                        }}
                            row={8}
                            defaultValue={"Ex: Health Insurance, Flexible Schedule!"}

                            placeholder='Job Benefits' />
                    </div>

                    {/* row 10 */}
                    <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Future Growth</label>
                        <textarea   {...register("employmentFutureGrowth")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem",
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",

                        }}
                            row={8}
                            defaultValue={"We put people first,drive innovation and do good in the community we live and work in."}

                            placeholder='Job Benefits' />
                    </div>
                    {/* row 11 */}
                    <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>OutLine</label>
                        <textarea   {...register("jobOutline")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem",
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",

                        }}
                            row={8}
                            defaultValue={"Ex: This position entails joining a web design and development team....!"}

                            placeholder='Job Benefits' />
                    </div>
                    {/* row 12 */}
                    <div style={{ width: "100%", marginTop: "2rem" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Posted By</label>
                        <input
                            type="email"
                            placeholder='your email'
                            {...register("postedBy")}
                            className='create-job-input'
                            style={{
                                backgroundColor: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px",
                                width: "100%", marginTop: "1rem",
                                fontSize: "1rem",
                                color: "#4F4F4F",
                            }}
                        />
                    </div>
                    {/* submit button */}
                    <input type="submit" style={{
                        marginTop: "1.25rem",
                        display: "inline-block",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "2rem",
                        paddingRight: "2rem",
                        marginBottom: "1.25rem",
                        marginRight: "6px",
                        background: "transparent",
                        border: "none",
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        borderRadius: "5px",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        backgroundColor: "#3575E2",
                        boxSizing: "border-box", // Include padding and border in the total width/height
                    }} />
                    <button
                        style={{
                            marginTop: "1.25rem",
                            display: "inline-block",
                            paddingTop: "0.5rem",
                            paddingBottom: "0.5rem",
                            paddingLeft: "2rem",
                            paddingRight: "2rem",
                            marginBottom: "1.25rem",
                            marginRight: "6px",
                            background: "transparent",
                            border: "none",
                            fontWeight: "600",
                            fontSize: "1.2rem",
                            borderRadius: "5px",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            backgroundColor: "#29529D", // Darker color
                            boxSizing: "border-box", // Include padding and border in the total width/height
                        }}
                        onClick={handleSendEmail}
                    >
                        Send Email to Subscribers
                    </button>
                    <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {dialogContent}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)}>Close</Button>-
                        </DialogActions>
                    </Dialog>


                    {/* Success popup */}

                </form>
            </div>
        </Box>
    )
};

export default CreateJob;