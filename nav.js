/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const nav = {
    "id": "menu-distribution",
    "buttons": [
        {
            "id": "menu-distribution-beta",
            "icon": "icon-beta",
            "children": [
                "./Continuous/betaDistributionPlot",
                "./Continuous/betaProbabilities",
                "./Continuous/betaQuantiles",
                "./Continuous/sampleBetaDistribution"
            ]
        },
        {
            "id": "menu-distribution-binomial",
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
            "id": "menu-distribution-cauchy",
            "icon": "icon-c",
            "children": [
                "./Continuous/cauchyDistributionPlot",
                "./Continuous/cauchyProbabilities",
                "./Continuous/cauchyQuantiles",
                "./Continuous/sampleCauchyDistribution"
            ]
        },
        {
            "id": "menu-distribution-chi-squared",
            "icon": "icon-chi_squared",
            "children": [
                "./Continuous/chisquaredDistributionPlot",
                "./Continuous/chisquaredProbabilities",
                "./Continuous/chisquaredQuantiles",
                "./Continuous/sampleChisquaredDistribution"
            ]
        },
        {
            "id": "menu-distribution-exponential",
            "icon": "icon-letter-e",
            "children": [
                "./Continuous/exponentialDistributionPlot",                
                "./Continuous/exponentialProbabilities",
                "./Continuous/exponentialQuantiles",
                "./Continuous/sampleExponentialDistribution"
            ]
        },
        {
            "id": "menu-distribution-f",
            "icon": "icon-f",
            "children": [
                "./Continuous/fDistributionPlot",
                "./Continuous/fProbabilities",
                "./Continuous/fQuantiles",
                "./Continuous/sampleFDistribution"
            ]
        },
        {
            "id": "menu-distribution-gamma",
            "icon": "icon-gamma",
            "children": [
                "./Continuous/gammaDistributionPlot",
                "./Continuous/gammaProbabilities",
                "./Continuous/gammaQuantiles",
                "./Continuous/sampleGammaDistribution"
            ]
        },
        {
            "id": "menu-distribution-geometric",
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
            "id": "menu-distribution-gumbel",
            "icon": "icon-gumbel",
            "children": [
                "./Continuous/gumbelDistributionPlot",
                "./Continuous/gumbelProbabilities",
                "./Continuous/gumbelQuantiles",
                "./Continuous/sampleGumbelDistribution"
            ]
        },
        {
            "id": "menu-distribution-hypergeometric",
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
            "id": "menu-distribution-logistic",
            "icon": "icon-logistic_white_comp",
            "children": [
                "./Continuous/logisticDistributionPlot",                
                "./Continuous/logisticProbabilities",
                "./Continuous/logisticQuantiles",
                "./Continuous/sampleLogisticDistribution"
            ]
        },
        {
            "id": "menu-distribution-lognormal",
            "icon": "icon-log-normal-distribution",
            "children": [
                "./Continuous/lognormalDistributionPlot",
                "./Continuous/lognormalProbabilities",
                "./Continuous/lognormalQuantiles",
                "./Continuous/sampleLognormalDistribution"
            ]
        },
        {
            "id": "menu-distribution-negativebinomial",
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
            "id": "menu-distribution-normal",
            "icon": "icon-gaussian-function",
            "children": [
                "./Continuous/normalDistributionPlot",
                "./Continuous/normalProbabilities",
                "./Continuous/normalQuantiles",
                "./Continuous/sampleNormalDistribution"
            ]
        },
        {
            "id": "menu-distribution-poisson",
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
            "id": "menu-distribution-t",
            "icon": "icon-tumblr",
            "children": [
                "./Continuous/tDistributionPlot",
                "./Continuous/tProbabilities",
                "./Continuous/tQuantiles",
                "./Continuous/sampletDistribution"
            ]
        },
        {
            "id": "menu-distribution-uniform",
            "icon": "icon-rectangle",
            "children": [
                "./Continuous/uniformDistributionPlot",
                "./Continuous/uniformProbabilities",
                "./Continuous/uniformQuantiles",
                "./Continuous/sampleUniformDistribution"
            ]
        },
        {
            "id": "menu-distribution-weibull",
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
