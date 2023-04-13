<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    },
    chartColors: {
      type: Object
    }
  },
  mounted() {
    const eventName = this.chartData.map(d => d.eventName).reverse();
    const totals = this.chartData.map(d => d.total).reverse();
    this.renderChart(
      {
        labels: eventName,
        datasets: [
          {
            label: this.label,
            data: totals,
          }
        ]
      },
      this.options
    );
  }
};
</script>
