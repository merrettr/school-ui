import { Schema, arrayOf } from 'normalizr';

export const BEHAVIOUR_CATEGORY_SCHEMA = new Schema('behaviourCategories');
export const BEHAVIOUR_CATEGORIES_SCHEMA = arrayOf(BEHAVIOUR_CATEGORY_SCHEMA);
export const BEHAVIOUR_SCHEMA = new Schema('behaviour');
export const BEHAVIOURS_SCHEMA = arrayOf(BEHAVIOUR_SCHEMA);
export const STUDENT_SCHEMA = new Schema('students');
export const STUDENTS_SCHEMA = arrayOf(STUDENT_SCHEMA);
export const OBSERVATIONS_SCHEMA = arrayOf(new Schema('observations'));
export const INVITE_SCHEMA = new Schema('invites');
export const INVITES_SCHEMA = arrayOf(INVITE_SCHEMA);
