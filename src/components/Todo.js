import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition';
import { TweenMax, Elastic } from 'gsap';

const duration = 0.5;

const animation = {
  show(target) {
    return TweenMax.from(target, duration, {
      opacity: 0,
      height: 0,
      ease: Elastic.easeOut.config(0.25, 1),
    });
  },
  hide(target) {
    return TweenMax.to(target, duration, {
      opacity: 0,
      height: 0,
      ease: Elastic.easeIn.config(0.25, 1),
    });
  }
};


class Todo extends React.Component {
  handleEnter = (target) => {
    animation.show(target);
  }
  handleExit = (target) => {
    animation.hide(target);
  }

  render() {
    const { onClick, completed, text } = this.props;
    return (
      <Transition
        {...this.props}
        timeout={duration * 1000}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
      >
        {() => (
          <li
            onClick={onClick}
            style={{
              textDecoration: completed ? 'line-through' : 'none'
            }}
          >
            {text}
          </li>
        )}
      </Transition >
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
