const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const sbiData = {
  quarter1: {
    revenue: '716.57 B',
    netIncome: '154.77 B',
    netProfit: '21.60%',
    operatingIncome: '213.55 B',
  },
  quarter2: {
    revenue: '607.66 B',
    netIncome: '180.94 B',
    netProfit: '29.78%',
    operatingIncome: '049.95 B',
  },
  quarter3: {
    revenue: '711.87 B',
    netIncome: '185.37 B',
    netProfit: '26.04%',
    operatingIncome: '252.08 B',
  },
  quarter4: {
    revenue: '805.33 B',
    netIncome: '161.00 B',
    netProfit: '19.99%',
    operatingIncome: '219.36 B',
  },
};

// Endpoint to get metrics for a specific quarter
app.get('/api/metrics/:quarter', (req, res) => {
  const { quarter } = req.params;


  if (sbiData.hasOwnProperty(quarter)) {
    res.json(sbiData[quarter]);
  } else {
    res.status(404).json({ error: 'Quarter not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
