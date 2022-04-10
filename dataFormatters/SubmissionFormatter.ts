import {Submission, SubmissionType} from "../types/Submission.type";

export function toSubmission(submission: any): SubmissionType {
    return new Submission(submission);
}

export function toSubmissions(submissions: any[]): SubmissionType[] {
    return submissions?.map(submission => {
        return toSubmission(submission);
    });
}
