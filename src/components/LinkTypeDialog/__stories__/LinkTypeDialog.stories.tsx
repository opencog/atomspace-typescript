// Generated with util/templates/component.stories.js
// @ts-ignore
import React, {useState} from "react";
import LinkTypeDialog from "../LinkTypeDialog";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import StorybookWrapper from "../../../util/StorybookWrapper";
import {action} from "@storybook/addon-actions";
export default {
    title: "components/LinkTypeDialog",
    argTypes: {
        onSubmit: {
            action: 'onSubmit'
        },
        onCancel: {
            action: 'onCancel'
        }
    },
};

export const Default = () => {
    const [open, setOpen] = useState<boolean>(true);

    return <ThemeProvider theme={theme}>
        <StorybookWrapper fill>
            <LinkTypeDialog
                testId="linktypedialog"
                open={open}
                options={[
                    "Sample1",
                    "Sample2"
                ]}
                onCancel={() => {
                    action("onCancel")();
                    setOpen(false);
                }}
                onSubmit={(chosenOption:string) => {
                    action("onSubmit")("Chosen Option: " + chosenOption);
                    setOpen(false);
                }}/>
        </StorybookWrapper>;
    </ThemeProvider>;

}