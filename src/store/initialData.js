import * as moment from 'moment';

export const initialSprintState = {
    sprints: [
        {
            id: 1,
            name: 'Sprint #1',
            startDate: moment.utc("2020-01-24"), // new Date("Feb 24 2020 00:00:00 GMT-0800 (Pacific Standard Time)"),
            endDate: moment.utc("2020-02-06"), //new Date("Mar 6 2020 23:59:59 GMT-0800 (Pacific Standard Time)"),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [
                {
                    id: { value: 1 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 2 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 3 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 4 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 5 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 6 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 7 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 8 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 9 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 10 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 11 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 12 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
            ]
        },
        {
            id: 2,
            name: 'Sprint #2',
            startDate: moment.utc("2020-02-09"), // new Date("Mar 9 2020 00:00:00 GMT-0800 (Pacific Standard Time)"),
            endDate: moment.utc("2020-02-20"), // new Date("Mar 20 2020 22:59:59 GMT-0800 (Pacific Standard Time)"),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [
                {
                    id: { value: 13 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 14 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 15 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                }
            ]
        },
        {
            id: 3,
            name: 'Sprint #3',
            startDate: moment.utc("2020-03-23"), // new Date("Mar 23 2020 00:00:00 GMT-0800 (Pacific Standard Time)"),
            endDate: moment.utc("2020-04-04"), // new Date("Apr 4 2020 22:59:59 GMT-0800 (Pacific Standard Time)"),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [
                {
                    id: { value: 19 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 20 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 21 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                }
            ]
        },
        {
            id: 4,
            name: 'Sprint #4',
            startDate: moment.utc("2020-04-06"), // new Date("Apr 6 2020 00:00:00 GMT-0800 (Pacific Standard Time)"),
            endDate: moment.utc("2020-04-17"), // new Date("Apr 17 2020 22:59:59 GMT-0800 (Pacific Standard Time)"),
            participants: 'Mike, Bobby',
            owner: 'Mike',
            projects: [
                {
                    id: { value: 22 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 23 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                },
                {
                    id: { value: 24 },
                    name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
                    manager: { value: 'Bobby' },
                    description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
                    category: { value: 'Grades & Transcripts' },
                    categoryLead: { value: 'Bobby' },
                    estimatedProjectSize: { value: '3 - Small-to-Medium' },
                    mustDo: { value: 'Nice-to-Have' },
                    externalDueDate: { value: '' },
                    deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
                    deliverableLink: { value: '' },
                    notes: { value: '' },
                    completionStatus: { value: '' },
                    notCompletedExplanation: { value: '' },
                    statusEndOfWeek1: { value: '' },
                    statusEndOfWeek2: { value: '' },
                    statusEndOfWeek3: { value: '' },
                    statusEndOfWeek4: { value: '' },
                    statusEndOfWeek5: { value: '' },
                    statusEndOfWeek6: { value: '' },
                    statusEndOfWeek7: { value: '' },
                    statusEndOfWeek8: { value: '' },
                }
            ]
        },

    ], // End of sprints
    queue: [
        {
            id: { value: 16 },
            name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
            manager: { value: 'Bobby' },
            description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
            category: { value: 'Grades & Transcripts' },
            categoryLead: { value: 'Bobby' },
            estimatedProjectSize: { value: '3 - Small-to-Medium' },
            mustDo: { value: 'Nice-to-Have' },
            externalDueDate: { value: '' },
            deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
            deliverableLink: { value: '' },
            notes: { value: '' },
            completionStatus: { value: '' },
            notCompletedExplanation: { value: '' },
            statusEndOfWeek1: { value: '' },
            statusEndOfWeek2: { value: '' },
            statusEndOfWeek3: { value: '' },
            statusEndOfWeek4: { value: '' },
            statusEndOfWeek5: { value: '' },
            statusEndOfWeek6: { value: '' },
            statusEndOfWeek7: { value: '' },
            statusEndOfWeek8: { value: '' },
        },
        {
            id: { value: 17 },
            name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
            manager: { value: 'Bobby' },
            description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
            category: { value: 'Grades & Transcripts' },
            categoryLead: { value: 'Bobby' },
            estimatedProjectSize: { value: '3 - Small-to-Medium' },
            mustDo: { value: 'Nice-to-Have' },
            externalDueDate: { value: '' },
            deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
            deliverableLink: { value: '' },
            notes: { value: '' },
            completionStatus: { value: '' },
            notCompletedExplanation: { value: '' },
            statusEndOfWeek1: { value: '' },
            statusEndOfWeek2: { value: '' },
            statusEndOfWeek3: { value: '' },
            statusEndOfWeek4: { value: '' },
            statusEndOfWeek5: { value: '' },
            statusEndOfWeek6: { value: '' },
            statusEndOfWeek7: { value: '' },
            statusEndOfWeek8: { value: '' },
        },
        {
            id: { value: 18 },
            name: { value: 'Verify course equivalencies & Grad Requirements in Illuminate' },
            manager: { value: 'Bobby' },
            description: { value: '-Audit all historical expeditions grades & match courses to equivalents' },
            category: { value: 'Grades & Transcripts' },
            categoryLead: { value: 'Bobby' },
            estimatedProjectSize: { value: '3 - Small-to-Medium' },
            mustDo: { value: 'Nice-to-Have' },
            externalDueDate: { value: '' },
            deliverables: { value: 'Historical Illuminate courses matched with current equivalencies.' },
            deliverableLink: { value: '' },
            notes: { value: '' },
            completionStatus: { value: '' },
            notCompletedExplanation: { value: '' },
            statusEndOfWeek1: { value: '' },
            statusEndOfWeek2: { value: '' },
            statusEndOfWeek3: { value: '' },
            statusEndOfWeek4: { value: '' },
            statusEndOfWeek5: { value: '' },
            statusEndOfWeek6: { value: '' },
            statusEndOfWeek7: { value: '' },
            statusEndOfWeek8: { value: '' },
        },
    ], // End of queue
};