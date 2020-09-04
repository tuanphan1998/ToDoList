import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany  = this.onChangeCompany.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            company: '',
            age:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/persons/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    company: response.data.company,
                    age: response.data.age });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            company: this.state.company,
            age: this.state.age
        };
        axios.post('http://localhost:4000/persons/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên của bạn:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tên công ty: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.company}
                               onChange={this.onChangeCompany}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tuổi: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.age}
                               onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Sửa đổi đồng ý"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}