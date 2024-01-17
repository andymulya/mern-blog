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