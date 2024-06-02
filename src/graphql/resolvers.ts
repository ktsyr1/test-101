
import * as bcrypt from 'bcryptjs';

import { BlogCreate, BlogDelete, BlogUpdate, blog, blogs } from "./functions/blog";
import { UserDelete, UserUpdate, user, users } from "./functions/user";
import { SurveyCreate, SurveyDelete, survey, surveys } from './functions/survey';
import { InvitCreate } from './functions/invit';


const resolvers = {
    Query: { 
        blogs: blogs,  // ✔
        blog: blog,

        users: users, // ✔ 
        user: user, // ✔

        surveys: surveys,
        survey: survey,
    },
    Mutation: {
        // Blog Management
        BlogCreate: BlogCreate, // ✔
        BlogUpdate: BlogUpdate, // ✔
        BlogDelete: BlogDelete,

        // Authentication
        AuthInvit: defFun,
        AuthInvitCreate: InvitCreate,

        // Authentication
        Authlogin: defFun,

        // User Management
        UserUpdate: UserUpdate, // ✔
        UserDelete: UserDelete, // ✔

        createSurvey: SurveyCreate,
        deleteSurvey: SurveyDelete, 
    },
};

export default resolvers;

async function defFun(parent: any, args: any) {
    return true;
}

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};