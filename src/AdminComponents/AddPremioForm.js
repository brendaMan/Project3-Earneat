import React, { Component } from 'react';
import { Form, Segment, Container, Header, Divider} from 'semantic-ui-react';

export default class AddPremioForm extends Component {
    constructor(props){
        super(props);
        this.state={
            nombre: "",
            puntos: "",
            descripcion: "",
            message: ""
        }
    }
    onCrearPremio = () => {
        fetch ('/api/premios', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json'}
        })
        .then (res =>{
                if (res.status === 200) {
                    this.setState({
                        nombre: "",
                        puntos: "",
                        descripcion: ""
                    });
                    this.props.onAddPremio() 
                }   
                else this.onErrorAddingPremio();
        })
        .catch ((err) => {
            console.log("ERROR: ", err)
            this.onErrorAddingPremio()
        })
    }

    onErrorAddingPremio = () => {
        this.setState({
            message: 'Hay un error por lo que no se ha podido crear este nuevo premio.'
        })
    }

    render() {
        return (
            <Segment 
                className="adminForms"
                inverted 
                tertiary
            >
                <Header 
                    as='h3'
                    textAlign='center'
                >
                    Creación de Premios Nuevos 
                </Header>
                <Divider/>
            <Form inverted>
                <Form.Field>
                    <label>Premio</label>
                    <Form.Input 
                        value= {this.state.nombre}
                        onChange= {e => this.setState({nombre: e.target.value})}
                        placeholder='Prize' />
                </Form.Field>
                <Form.Field>
                    <label>Puntos</label>
                    <Form.Input 
                        value= {this.state.puntos}
                        onChange= {e => this.setState({puntos: e.target.value})}
                        type="number"
                        placeholder='Points' />
                </Form.Field>
                {/* <Form.Field>
                    <label>URL de la Imagen</label>
                    <Form.Input 
                        placeholder='Image URL' />
                </Form.Field> */}
                <Form.Field>
                    <label>Detalles</label>
                    <Form.TextArea
                        value= {this.state.descripcion}
                        onChange= {e=> this.setState({descripcion: e.target.value})} 
                        placeholder='Details' />
                </Form.Field>
                <Container textAlign="center">
                    <Form.Button
                        inverted 
                        type="submit"
                        onClick={this.onCrearPremio}
                    >
                        Crear Premio
                    </Form.Button>
                    {this.state.message}
                </Container>
            </Form>
            </Segment>
        )
    }
}
