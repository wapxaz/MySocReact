import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    } 
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
    } 

    render() {
        return (<div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>
                        {this.props.status !== null ? this.props.status : ''}
                    </span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input autoFocus={true} value={this.props.status} onBlur={this.deactivateEditMode} />
                </div>
            }
        </div>
        );
    }
}

export default ProfileStatus;