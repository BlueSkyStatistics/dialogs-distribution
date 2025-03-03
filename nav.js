/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const nav = {
    "name": "Distribution",
    "tab": "distribution",
    "buttons": [
        {
            "name": "Beta",
            "icon": "icon-beta",
            "children": [
                "./Continuous/betaDistributionPlot",
                "./Continuous/betaProbabilities",
                "./Continuous/betaQuantiles",
                "./Continuous/sampleBetaDistribution"
            ]
        },
        {
            "name": "Binomial",
            "icon": "icon-binary-code",
            "children": [
                "./Discrete/binomialDistributionPlot",
                "./Discrete/binomialProbabilities",
                "./Discrete/binomialQuantiles",
                "./Discrete/binomialTailProbabilities",
                "./Discrete/sampleBinomialDistribution"
            ]
        },                
        {
            "name": "Cauchy",
            "icon": "icon-c",
            "children": [
                "./Continuous/cauchyDistributionPlot",
                "./Continuous/cauchyProbabilities",
                "./Continuous/cauchyQuantiles",
                "./Continuous/sampleCauchyDistribution"
            ]
        },
        {
            "name": "Chi-squared",
            "icon": "icon-chi_squared",
            "children": [
                "./Continuous/chisquaredDistributionPlot",
                "./Continuous/chisquaredProbabilities",
                "./Continuous/chisquaredQuantiles",
                "./Continuous/sampleChisquaredDistribution"
            ]
        },
        {
            "name": "Exponential",
            "icon": "icon-letter-e",
            "children": [
                "./Continuous/exponentialDistributionPlot",                
                "./Continuous/exponentialProbabilities",
                "./Continuous/exponentialQuantiles",
                "./Continuous/sampleExponentialDistribution"
            ]
        },
        {
            "name": "F",
            "icon": "icon-f",
            "children": [
                "./Continuous/fDistributionPlot",
                "./Continuous/fProbabilities",
                "./Continuous/fQuantiles",
                "./Continuous/sampleFDistribution"
            ]
        },
        {
            "name": "Gamma",
            "icon": "icon-gamma",
            "children": [
                "./Continuous/gammaDistributionPlot",
                "./Continuous/gammaProbabilities",
                "./Continuous/gammaQuantiles",
                "./Continuous/sampleGammaDistribution"
            ]
        },
        {
            "name": "Geometric",
            "icon": "icon-area-chart",
            "children": [
                "./Discrete/geometricDistribution",
                "./Discrete/geometricProbabilities",
                "./Discrete/geometricQuantiles",
                "./Discrete/geometricTailProbabilities",
                "./Discrete/sampleGeometricDistribution"
            ]
        },                
        {
            "name": "Gumbel",
            "icon": "icon-gumbel",
            "children": [
                "./Continuous/gumbelDistributionPlot",
                "./Continuous/gumbelProbabilities",
                "./Continuous/gumbelQuantiles",
                "./Continuous/sampleGumbelDistribution"
            ]
        },
        {
            "name": "Hypergeometric",
            "icon": "icon-curve",
            "children": [
                "./Discrete/hypergeometricDistributionPlot",                
                "./Discrete/hypergeometricProbabilities",
                "./Discrete/hypergeometricQuantiles",
                "./Discrete/hypergeometricTailProbabilities",
                "./Discrete/sampleHypergeometricDistribution"
            ]
        },                 
        {
            "name": "Logistic",
            "icon": "icon-logistic_white_comp",
            "children": [
                "./Continuous/logisticDistributionPlot",                
                "./Continuous/logisticProbabilities",
                "./Continuous/logisticQuantiles",
                "./Continuous/sampleLogisticDistribution"
            ]
        },
        {
            "name": "Lognormal",
            "icon": "icon-log-normal-distribution",
            "children": [
                "./Continuous/lognormalDistributionPlot",
                "./Continuous/lognormalProbabilities",
                "./Continuous/lognormalQuantiles",
                "./Continuous/sampleLognormalDistribution"
            ]
        },
        {
            "name": "Negative Binomial",
            "icon": "icon-negtive-binary-code",
            "children": [
                "./Discrete/negativeBinomialDistributionPlot",
                "./Discrete/negativeBinomialProbabilities",
                "./Discrete/negativeBinomialQuantiles",
                "./Discrete/negativeBinomialTailProbabilities",
                "./Discrete/sampleNegativeBinomialDistribution"
            ]
        },                 
        {
            "name": "Normal",
            "icon": "icon-gaussian-function",
            "children": [
                "./Continuous/normalDistributionPlot",
                "./Continuous/normalProbabilities",
                "./Continuous/normalQuantiles",
                "./Continuous/sampleNormalDistribution"
            ]
        },
        {
            "name": "Poisson",
            "icon": "icon-fish",
            "children": [
                "./Discrete/poissonDistributionPlot",
                "./Discrete/poissonProbabilities",
                "./Discrete/poissonQuantiles",
                "./Discrete/poissonTailProbabilities",
                "./Discrete/samplePoissonDistribution"
            ]
        },
        {
            "name": "t",
            "icon": "icon-tumblr",
            "children": [
                "./Continuous/tDistributionPlot",
                "./Continuous/tProbabilities",
                "./Continuous/tQuantiles",
                "./Continuous/sampletDistribution"
            ]
        },
        {
            "name": "Uniform",
            "icon": "icon-rectangle",
            "children": [
                "./Continuous/uniformDistributionPlot",
                "./Continuous/uniformProbabilities",
                "./Continuous/uniformQuantiles",
                "./Continuous/sampleUniformDistribution"
            ]
        },
        {
            "name": "Weibull",
            "icon": "icon-weibull_distribution",
            "children": [
                "./Continuous/weibullDistributionPlot",
                "./Continuous/weibullProbabilities",
                "./Continuous/weibullQuantiles",
                "./Continuous/sampleWeibullDistribution"
            ]
        }
        

    ]           
}

module.exports.nav = nav
