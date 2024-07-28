"use client";
import "regenerator-runtime/runtime";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ContextMenuProvider } from "mantine-contextmenu";

const App = ({ children, nonce }) => {
    return (
        <MantineProvider
            defaultColorScheme="light"
            getStyleNonce={() => {
                return nonce;
            }}
        >
            <Notifications />
            <ModalsProvider>
                <ContextMenuProvider>{children}</ContextMenuProvider>
            </ModalsProvider>
        </MantineProvider>
    );
};

export default App;
