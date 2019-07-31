import React from 'react';
import './board-container.scss';

type BoardContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

class BoardContainer extends React.Component<BoardContainerProps> {
    render() {
        let props = { ...this.props };
    
        if (!props.className) props.className = 'board-container';
        else props.className += ' board-container';
    
        return <div {...props}></div>;
    }
}

export default BoardContainer;