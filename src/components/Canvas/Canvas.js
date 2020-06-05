import React, { Component } from 'react';
import p5 from 'p5'



class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: [255, 255, 255, 255],
            weight: 4,
        }
        this.myRef = React.createRef()
    }

    drawing = []
    currentPath = []
    isDrawing = false

    width = 650;
    height = 650;


    sketch = p => {
        /* let drawing = [];
        let currentPath = [];
        let isDrawing = false; */

p5.disableFriendlyErrors = true;

        p.setup = () => {
            p.canvas = p.createCanvas(this.width, this.height);
            p.frameRate(25)
            p.canvas.mousePressed(startPath);
            p.canvas.mouseReleased(endPath);
        }



        const startPath = () => {

            this.isDrawing = true;
            this.currentPath = [];
            this.drawing.push(this.currentPath);

        }

        const endPath = () => {
            this.isDrawing = false;
        }


        p.draw = () => {
            p.background(0);
            p.noStroke();
            p.fill(255);
            p.rect(0, 0, p.width / 6, 50);

            p.fill(0, 255, 0);
            p.rect(p.width / 6, 0, p.width / 6, 50);

            p.fill(0, 0, 255);
            p.rect(p.width / 3, 0, p.width / 6, 50);

            p.fill(255, 0, 0);
            p.rect(p.width / 2, 0, p.width / 6, 50);

            p.fill(255, 234, 0);
            p.rect(2 * p.width / 3, 0, p.width / 6, 50);

            p.fill(0);
            p.rect(5 * p.width / 6, 0, p.width / 6, 50);

            p.fill(50)
            p.rect(0, 50, p.width, 5)

            if (this.isDrawing) {
                let point = {
                    x: p.mouseX,
                    y: p.mouseY,
                    clr: this.state.color,
                    weight: this.state.weight
                };

                this.currentPath.push(point);
                this.props.socket.emit('draw', { path: [...this.currentPath] })
            }

            p.mousePressed = () => {
                if (p.mouseY < 50) {
                    let weight = p.mouseX > 5 * p.width / 6 ? 25 : 4

                    this.setState({ color: p.get(p.mouseX, p.mouseY), weight })
                }
            }

            if (p.mouseY > 50) {
                p.cursor(p.CROSS);
            } else {
                p.cursor('pointer')
            }


            for (var i = 0; i < this.drawing.length; i++) {
                var path = this.drawing[i];
                p.beginShape();
                for (var j = 0; j < path.length; j++) {
                    //shape params
                    p.stroke(path[j].clr)
                    p.strokeWeight(path[j].weight)
                    p.noFill()

                    //vertex
                    p.vertex(path[j].x, path[j].y);
                }
                p.endShape();
            }
        }
    }






    componentDidMount() {
        this.myP5 = new p5(this.sketch, this.myRef.current)
        this.props.socket.on('draw-back', data => {
            this.drawing.push(data.path)
        })

    }


    render() {
        return (
            <div ref={this.myRef}></div>
        );
    }
}

export default Canvas;
