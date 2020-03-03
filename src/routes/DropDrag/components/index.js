import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BaseComponent from '../../../components/BaseComponent';
import DropDrap from '../../../components/DropDrap';
import DropDrapBox from '../../../components/DropDrap/box';
import './index.less';
import ContainerBox from './ContainerBox';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    boxes: {
      a: { top: 20, left: 80, title: 'Drag me around' },
      b: { top: 180, left: 20, title: 'Drag me too' },
    },
    cards: [
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ],
  };

  moveBox = (id, left, top) => {
    const { boxes } = this.state;
    this.setState({boxes: {...boxes, [id]: {...boxes[id], left, top}}})
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex]
    cards.splice(dragIndex, 1);
    cards.splice(hoverIndex, 0, dragCard);
    this.setState({cards})
  }

  renderCard(card, index) {
    return (
      <DropDrap
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={(dragIndex, hoverIndex) => this.moveCard(dragIndex, hoverIndex)}
      />
    )
  }

  render() {
    const { cards, boxes } = this.state;
    return (
      <Layout className="full-layout page dropdrag-page">
        <DndProvider backend={HTML5Backend}>
          <Content>
            {cards.map((card, i) => this.renderCard(card, i))}
            <ContainerBox moveBox={this.moveBox}>
              {Object.keys(boxes).map(key => {
                const { left, top, title } = boxes[key]
                return (
                  <DropDrapBox
                    key={key}
                    id={key}
                    left={left}
                    top={top}
                    // hideSourceOnDrag={hideSourceOnDrag}
                  >
                    {title}
                  </DropDrapBox>
                )
              })}
            </ContainerBox>
          </Content>
        </DndProvider>
      </Layout>
    );
  }
}
