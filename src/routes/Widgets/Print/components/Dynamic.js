import React, { Component } from 'react';

class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/emojis')
      .then(resp => resp.json())
      .then(resp => {
        const images = [];
        for (const key in resp) {
          if (Object.prototype.hasOwnProperty.call(resp, key)) {
            images.push({
              link: resp[key],
              title: key
            });
            if (images.length === 40)
              break;
          }
        }
        this.setState({
          images
        });
      })
      .catch(e => console.error(e));
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        {images.map((image, index) => (
          <img key={index} src={image.link} alt={image.title} title={image.title} />
        ))}
      </div>
    );
  }
}

export default Dynamic;
