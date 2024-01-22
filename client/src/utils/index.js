import Checklist from "@editorjs/checklist"
import Quote from "@editorjs/quote"
import Paragraph from "@editorjs/paragraph"
import Code from "@editorjs/code"
import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import InlineCode from "@editorjs/inline-code"
import List from "@editorjs/list"
import Marker from "@editorjs/marker"
import Table from "@editorjs/table"
import Underline from "@editorjs/underline"


export const getDataForm = (formRef) => {
    try{
        const formData = new FormData(formRef)
        const data = {}

        for(const [key, value] of formData) data[key] = value

        return data

    }catch(err){
        if(err) throw err
    }
}

export const generateFileName = (username) => (`${new Date().getTime()} - ${ username }`)


export const toolsEditor = {
    header: {
        class: Header,
        inlineToolbar: true,
        config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 2
        }
    },
    qoute: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: '"Enter a quote"',
            captionPlaceholder: "Quote's author",
        },
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true
    },
    code: Code,
    embed: {
        class: Embed,
        config: {
            services: {
                youtube: true
            }
        }
    },
    inlinecode: InlineCode,
    list: {
        class: List,
        inlineToolbar: true
    },
    marker: {
        class: Marker,
    },
    table: {
        class: Table,
        inlineToolbar: true
    },
    underline: Underline
}