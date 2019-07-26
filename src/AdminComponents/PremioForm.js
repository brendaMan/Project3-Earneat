import React, { Component } from 'react';
import { Form, Segment, Container, Popup} from 'semantic-ui-react';

export default class PremioForm extends Component {
    constructor(props){
        super(props);
        this.state={
            id: 0,
            nombre: "",
            puntos: "",
            descripcion: "",
            activo: "",
            message: ""
        };
    }

    onCrearPremio = () => {
        fetch ('/api/premios', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json'}
        })
        .then (res => {
                if (res.status === 200) {
                    this.onClear()
                    this.props.onLoadPremios() 
                }   
                else this.onError();
        })
        .catch (() => {
            this.onError()
        })
    };

    onEditarPremio = () => {
        fetch (`/api/premios/${this.state.id}`, {
            method: "PATCH",
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json'} 
        }) 
            .then (res => {
                if (res.status === 200) {
                    debugger
                    this.onClear();
                    this.props.onLoadPremios();
                }
                else this.onError();
        })
            .catch (() => {
                this.onError()
            })
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            id: newProps.premio.id,
            nombre: newProps.premio.nombre,
            puntos: newProps.premio.puntos, 
            imagen: newProps.premio.imagen,
            descripcion: newProps.premio.descripcion,
            activo: newProps.premio.activo
        })
    }

    onError = () => {
        this.setState({
            message: 'Hay ocurrido un error por lo que no se ha podido ejecutar esta acción.'
        })
    }

    onClear = () => {
        this.setState({
            id: 0,
            nombre: "",
            puntos: "",
            imagen: "",
            descripcion: "",
            activo: ""
        });
    }


    render() {
        return (
            <Segment className="adminForms" inverted tertiary>
            <Form inverted>
{/* Input Nombre Premio */}
                <Form.Field>
                    <label>Premio</label>
                    <Form.Input 
                        value= {this.state.nombre}
                        onChange= {e => this.setState({nombre: e.target.value})}
                        placeholder='Prize' />
                </Form.Field>
{/* Input Puntos */}
                <Form.Field>
                    <label>Puntos</label>
                    <Form.Input 
                        value= {this.state.puntos}
                        onChange= {e => this.setState({puntos: e.target.value})}
                        type="number"
                        placeholder='Points' />
                </Form.Field>
{/* Input Imagen */}
                <Form.Field>
                    <label>URL de la Imagen</label>
                    <Popup
                        trigger= {<Form.Input 
                            value= {this.state.imagen}
                            onChange= {e => this.setState({imagen: e.target.imagen})}
                            placeholder='Image URL' />}
                        content='Para obtener una dirección URL unica de cualquier imagen, ya sea de la web o personal, se puede utilizar https://postimages.org/ y utilizar el "direct link" facilitado por esta página.'
                        position='top center'
                    />
                </Form.Field>
{/* Input Detalles */}
                <Form.Field>
                    <label>Detalles</label>
                    <Form.TextArea
                        value= {this.state.descripcion}
                        onChange= {e=> this.setState({descripcion: e.target.value})} 
                        placeholder='Details' />
                </Form.Field>
{/* Buttons para crear o editar premios */}
                <Container textAlign="center">
                {this.state.id === 0 ? 
                    <Form.Button inverted circular type="submit" 
                        onClick={this.onCrearPremio}
                        > Guardar </Form.Button>
                :
                <Form.Button inverted circular type="submit" 
                        onClick={this.onEditarPremio}
                        > Guardar </Form.Button>
                }
                </Container>
                <h4 style={{ color: 'red', textAlign: 'center'}}>{this.state.message}</h4>
            </Form>
            </Segment>
        )
    }
}
