import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as d3 from 'd3';
import PageLayout from '../../components/PageLayout';
import { Card } from 'material-ui/Card';
import { fetchSingleMeasure } from '../../actions/index';

import './MeasurePage.css';

const mapStateToProps = state => ({
    measure: state.measure
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleMeasure
}, dispatch);

class MeasurePage extends Component {

    static propTypes = {
        measure: PropTypes.object,
        fetchSingleMeasure: PropTypes.func
    }

    style = {
        wrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 40,
            flexWrap: 'wrap'
        },
        chartCard: {
            width: '70%',
            minHeight: 600
        }
    }

    componentWillMount() {
        const {
            match: { params: { id } },
            fetchSingleMeasure
        } = this.props;
        fetchSingleMeasure(id);
    }

    componentWillReceiveProps(nextProps) {
        const { points } = nextProps.measure;
        points && this.renderChart(points);
    }

    renderChart(points) {
        const margin = { top: 20, right: 30, bottom: 20, left: 40 },
            width = 900 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([d3.min(points, d => d[0]), d3.max(points, d => d[0])])
            .range([ 0, width ]);

        const y = d3.scaleLinear()
            .domain([d3.min(points, d => d[1]), d3.max(points, d => d[1])])
            .range([ height, 0 ]);

        const brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("end", onBrushEnd);

        const peakLine = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));

        const chart = d3.select('.MeasurePage__Chart')
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

        const main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height);

        const xAxis = d3.axisBottom()
            .scale(x)
            .ticks(5);

        main.append('g')
            .attr('transform', 'translate(0,' + y(0) + ')')
            .attr('class', 'axis')
            .call(xAxis);

        const yAxis = d3.axisLeft()
            .scale(y)
            .ticks(5)
            .tickSize([-width])
            .tickSizeOuter(0);

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'axis')
            .call(yAxis);

        main.append("g")
            .selectAll("scatter-dots")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => x(d[0]) )
            .attr("cy", d => y(d[1]) )
            .attr("r", 1.5)
            .attr("fill", "#1abc9c");

        main.append("g")
            .attr("class", "brush")
            .call(brush);

        function onBrushEnd() {
            const selection = d3.event.selection;
            const [leftX, rightX] = selection.map(x.invert);
            const leftEdge = points.find(point => point[0] > leftX);
            const rightDiapason = points.filter(point => point[0] < rightX);
            const rightEdge = rightDiapason[rightDiapason.length - 1];
            d3.selectAll(".peakline").remove();
            main.append("path")
                .attr("class", "peakline")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("d", peakLine([leftEdge, rightEdge]));
        }
    }

    render() {
        return (
            <PageLayout>
                <div style={ this.style.wrapper }>
                    <Card style={ this.style.chartCard }>
                        <div className="MeasurePage__Chart"/>
                    </Card>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePage);