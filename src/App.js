import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  // Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Divider,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';

function App() {
  const theme = useTheme();
  const [inputs, setInputs] = useState({
    annualSalary: '',
    totalHRA: '',
    totalNPS: '',
    totalTelephone: '',
    totalMealCard: '',
    incomeTaxSavings: '',
  });

  const handleInputChange = (field) => (event) => {
    setInputs(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const calculateIncomeTax = (annualIncome) => {
    let tax = 0;
    
    // Tax slabs for FY 2024-25 (New Tax Regime)
    if (annualIncome <= 300000) {
      tax = 0;
    } else if (annualIncome <= 600000) {
      tax = (annualIncome - 300000) * 0.05;
    } else if (annualIncome <= 900000) {
      tax = 15000 + (annualIncome - 600000) * 0.10;
    } else if (annualIncome <= 1200000) {
      tax = 45000 + (annualIncome - 900000) * 0.15;
    } else if (annualIncome <= 1500000) {
      tax = 90000 + (annualIncome - 1200000) * 0.20;
    } else {
      tax = 150000 + (annualIncome - 1500000) * 0.30;
    }

    // Add 4% cess
    tax = tax * 1.04;
    return tax;
  };

  const calculateSalary = () => {
    if (!inputs.annualSalary) return null;

    const annual = parseFloat(inputs.annualSalary);
    const basic = annual * 0.422; // 42% Basic
    const fbp = annual * 0.578; // 58% Flexible Benefit Pay

    // Parse input values
    const hra = parseFloat(inputs.totalHRA) || 0;
    const nps = parseFloat(inputs.totalNPS) || 0;
    const telephone = parseFloat(inputs.totalTelephone) || 50000; // Default to 50000 if not provided
    const mealCard = parseFloat(inputs.totalMealCard) || 0;
    const taxSavings = parseFloat(inputs.incomeTaxSavings) || 0;

    // Monthly calculations
    const monthlyBasic = basic / 12;
    const monthlyHRA = hra / 12;
    const monthlyNPS = nps / 12;
    const monthlyTelephone = telephone / 12;
    const monthlyMealCard = mealCard / 12;

    // PF calculation (12% of basic)
    const pf = basic * 0.12;
    const monthlyPF = pf / 12;

    // Professional Tax (₹200 per month)
    const monthlyProfessionalTax = 200;

    // Remaining FBP after deductions
    const remainingFBP = fbp - hra - nps - telephone - mealCard;
    const monthlyRemainingFBP = remainingFBP / 12;

    // Calculate taxable income
    const annualTaxableIncome = annual - pf - nps - telephone - mealCard - taxSavings;
    const annualTax = calculateIncomeTax(annualTaxableIncome);
    const monthlyTax = annualTax / 12;

    // Total monthly salary (excluding meal card as it's reimbursed separately)
    const totalMonthlySalary = monthlyBasic + monthlyHRA + monthlyNPS + monthlyTelephone + monthlyRemainingFBP;

    return {
      monthlyBasic,
      monthlyPF,
      monthlyNPS,
      monthlyHRA,
      monthlyTelephone,
      monthlyMealCard,
      monthlyRemainingFBP,
      monthlyTax,
      monthlyProfessionalTax,
      totalMonthlySalary,
      annualTaxableIncome,
    };
  };

  const salaryBreakdown = calculateSalary();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 4,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Salary Calculator
        </Typography>
        
        <Card 
          sx={{ 
            mb: 4,
            background: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              Salary Components
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Annual Base Pay (₹)"
                  type="number"
                  value={inputs.annualSalary}
                  onChange={handleInputChange('annualSalary')}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total HRA (₹)"
                  type="number"
                  value={inputs.totalHRA}
                  onChange={handleInputChange('totalHRA')}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total NPS (₹)"
                  type="number"
                  value={inputs.totalNPS}
                  onChange={handleInputChange('totalNPS')}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Telephone Reimbursement (₹)"
                  type="number"
                  value={inputs.totalTelephone}
                  onChange={handleInputChange('totalTelephone')}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Meal Card (₹)"
                  type="number"
                  value={inputs.totalMealCard}
                  onChange={handleInputChange('totalMealCard')}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Income Tax Savings (₹)"
                  type="number"
                  value={inputs.incomeTaxSavings}
                  onChange={handleInputChange('incomeTaxSavings')}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {salaryBreakdown && (
          <TableContainer 
            component={Paper}
            sx={{ 
              borderRadius: 2,
              boxShadow: 2,
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Component</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Monthly Amount (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell align="right">{salaryBreakdown.monthlyBasic.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HRA</TableCell>
                  <TableCell align="right">{salaryBreakdown.monthlyHRA.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Telephone Reimbursement</TableCell>
                  <TableCell align="right">{salaryBreakdown.monthlyTelephone.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NPS</TableCell>
                  <TableCell align="right">{salaryBreakdown.monthlyNPS.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remaining FBP</TableCell>
                  <TableCell align="right">{salaryBreakdown.monthlyRemainingFBP.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                  <TableCell><strong>Total Monthly Salary</strong></TableCell>
                  <TableCell align="right"><strong>{salaryBreakdown.totalMonthlySalary.toFixed(2)}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Provident Fund</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>-{salaryBreakdown.monthlyPF.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Income Tax</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>-{salaryBreakdown.monthlyTax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Professional Tax</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>-{salaryBreakdown.monthlyProfessionalTax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: alpha(theme.palette.success.main, 0.1) }}>
                  <TableCell><strong>Net Monthly Salary</strong></TableCell>
                  <TableCell align="right"><strong>{(salaryBreakdown.totalMonthlySalary - salaryBreakdown.monthlyPF - salaryBreakdown.monthlyNPS - salaryBreakdown.monthlyTax - salaryBreakdown.monthlyProfessionalTax).toFixed(2)}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Meal Card (Reimbursed Separately)</TableCell>
                  <TableCell align="right">{salaryBreakdown.monthlyMealCard.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Annual Taxable Income</TableCell>
                  <TableCell align="right">{salaryBreakdown.annualTaxableIncome.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}

export default App; 