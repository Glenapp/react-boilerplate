import { DialogProps, Dialog, Typography, useTheme, Divider, DialogContent, DialogActions, Button, Grid, Stack } from '@mui/material';
import { forwardRef } from 'react';
import DialogTitleWithClose from 'ui-component/DialogTitleWithClose';

interface ConfirmDialogProps extends DialogProps {
    title: any;
    text?: any;
    actionBtnText?: string;
    onActionBtnClick: (e?: any) => void;
    primaryActionBtnColor?: boolean;
}

const ConfirmDialog = forwardRef(
    (
        { onClose, title, text, actionBtnText, onActionBtnClick, primaryActionBtnColor, open, children, ...props }: ConfirmDialogProps,
        ref: any
    ) => {
        const theme = useTheme();

        return (
            <Dialog ref={ref} fullWidth open={open} {...props} onClose={onClose as any}>
                {open && (
                    <>
                        <DialogTitleWithClose id="confirm-dialog" onClose={onClose as any}>
                            <Typography
                                variant="h2"
                                fontWeight={400}
                                color={theme.palette.grey.A700}
                                sx={{
                                    textTransform: 'uppercase'
                                }}
                            >
                                {title}
                            </Typography>
                        </DialogTitleWithClose>
                        <Divider />
                        <DialogContent>
                            <Typography variant="body2" fontSize="14px">
                                {text}
                                {children}
                            </Typography>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2, pb: 1 }}>
                            <form
                                noValidate
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onActionBtnClick();
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Button type="button" variant="outlined" onClick={onClose as any}>
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    textTransform: 'uppercase'
                                                }}
                                                color={primaryActionBtnColor ? 'secondary' : 'error'}
                                                onClick={onActionBtnClick}
                                            >
                                                {actionBtnText || title}
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        );
    }
);

export default ConfirmDialog;
