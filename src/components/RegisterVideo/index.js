import React from "react";
import { StyledRegisterVideo } from "./styles";

//Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            //console.log(value)
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm(){
            setValues({});
        }
    }

}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost", url: "https://youtube.com" }
    })
    const [formVisivel, setFormVisivel] = React.useState(false)
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {
                formVisivel ?
                    (
                        <form onSubmit={(evento) => {
                            evento.preventDefault();
                            console.log(formCadastro.values)
                            setFormVisivel(false)
                            formCadastro.clearForm()
                        }}>
                            <div>
                                <button className="close-modal" onClick={() => setFormVisivel(false)}>
                                    X
                                </button>
                                <input
                                    placeholder="Titulo do Video"
                                    name="titulo"
                                    value={formCadastro.values.titulo}
                                    onChange={formCadastro.handleChange}
                                />
                                <input
                                    placeholder="URL"
                                    name="url"
                                    value={formCadastro.values.url}
                                    onChange={formCadastro.handleChange}
                                />
                                <button type="submit">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    )
                    : false}

        </StyledRegisterVideo>
    )
}