import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/users-reducer";

const usersSearchFormValidate = (values: any) => {
    const errors = {};

    return errors;
}

type FormType = {
    term: string
    friend: string //'null' | 'true' | 'false'
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }

        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return <div>
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <ErrorMessage name="email" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
});

export default UsersSearchForm;