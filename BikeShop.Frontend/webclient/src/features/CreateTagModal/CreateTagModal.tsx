import React from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import useCreateTagModal from "./CreateTagModalStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICreateTag, IProductTag} from "../../entities";
import {ControlledCheckbox, ControlledInput} from "../../shared/ui";

interface props {
    onSeccuss?: (tag: IProductTag) => void
}

const CreateTagModal = (props: props) => {
    const open = useCreateTagModal(s => s.createTagModal)
    const setOpen = useCreateTagModal(s => s.setCreateTagModal)
    const parentNode = useCreateTagModal(s => s.parentNode)
    const createTag = useCreateTagModal(s => s.createTag)

    const control = useForm<ICreateTag>({
        defaultValues: {
            name: "",
            sortOrder: 0,
            isRetailVisible: false,
            isB2BVisible: false,
            isUniversal: false
        }
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#33373B',

        boxShadow: 24,
        p: 4,
        borderRadius: 10,
        color: 'white'
    };


    const onSubmit: SubmitHandler<ICreateTag> = (data: ICreateTag) => {
        data.parentId = parentNode.id
        createTag(data).then(r => {
            setOpen(false)
            props.onSeccuss ? props.onSeccuss(r.data) : true
            
            control.setValue('name', '')
            control.setValue('sortOrder', 0)
            control.setValue('isRetailVisible', false)
            control.setValue('isB2BVisible', false)
            control.setValue('isUniversal', false)
        })
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            onContextMenu={(event) => {
                event.preventDefault()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={control.handleSubmit(onSubmit)}>

                <Typography sx={{pb: 3}}>????????????????
                    ??: {parentNode.id === undefined ? '???????????? ????????????' : parentNode.name}</Typography>

                <ControlledInput name={"name"} label={"???????????????? ????????"} control={control}
                                 rules={{required: "?????????????? ???????????????? ???????????? ????????"}}/>
                <br/>
                <br/>
                <ControlledInput name={"sortOrder"} label={"?????????????? ????????????????????"} control={control}
                                 rules={{
                                     required: "?????????????? ???????????????????? ???????????????????? ????????????",
                                     validate: (value: number) => value > -1
                                 }}/>

                <ControlledCheckbox name={"isRetailVisible"} label={'?????????? ?? ????????????????-????????????????'} control={control}/>
                <ControlledCheckbox name={"isB2BVisible"} label={'?????????? ?? B2B'} control={control}/>
                <ControlledCheckbox name={"isUniversal"} label={'?????????????????????????? ??????'} control={control}/>
                <br/>
                <Button color='primary' type="submit">?????????????? ??????</Button>

            </Box>
        </Modal>
    );
};

export default CreateTagModal;