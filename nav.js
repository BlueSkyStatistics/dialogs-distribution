/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

let t = getT('menutoolbar')
const nav = () => ({
    "name": t('distribution_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "distribution",
    "buttons": [
        {
            "name": t('distribution_Beta'),// {ns: 'menutoolbar'}),
            "icon": "icon-beta",
            "children": [
                "./Continuous/betaDistributionPlot",
                "./Continuous/betaProbabilities",
                "./Continuous/betaQuantiles",
                "./Continuous/sampleBetaDistribution"
            ]
        },
        {
            "name": t('distribution_Binomial'),// {ns: 'menutoolbar'}),
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
            "name": t('distribution_Cauchy'),// {ns: 'menutoolbar'}),
            "icon": "icon-c",
            "children": [
                "./Continuous/cauchyDistributionPlot",
                "./Continuous/cauchyProbabilities",
                "./Continuous/cauchyQuantiles",
                "./Continuous/sampleCauchyDistribution"
            ]
        },
        {
            "name": t('distribution_Chi_squared'),// {ns: 'menutoolbar'}),
            "icon": "icon-chi_squared",
            "children": [
                "./Continuous/chisquaredDistributionPlot",
                "./Continuous/chisquaredProbabilities",
                "./Continuous/chisquaredQuantiles",
                "./Continuous/sampleChisquaredDistribution"
            ]
        },
        {
            "name": t('distribution_Exponential'),// {ns: 'menutoolbar'}),
            "icon": "icon-letter-e",
            "children": [
                "./Continuous/exponentialDistributionPlot",                
                "./Continuous/exponentialProbabilities",
                "./Continuous/exponentialQuantiles",
                "./Continuous/sampleExponentialDistribution"
            ]
        },
        {
            "name": t('distribution_F'),// {ns: 'menutoolbar'}),
            "icon": "icon-f",
            "children": [
                "./Continuous/fDistributionPlot",
                "./Continuous/fProbabilities",
                "./Continuous/fQuantiles",
                "./Continuous/sampleFDistribution"
            ]
        },
        {
            "name": t('distribution_Gamma'),// {ns: 'menutoolbar'}),
            "icon": "icon-gamma",
            "children": [
                "./Continuous/gammaDistributionPlot",
                "./Continuous/gammaProbabilities",
                "./Continuous/gammaQuantiles",
                "./Continuous/sampleGammaDistribution"
            ]
        },
        {
            "name": t('distribution_Geometric'),// {ns: 'menutoolbar'}),
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
            "name": t('distribution_Gumbel'),// {ns: 'menutoolbar'}),
            "icon": "icon-gumbel",
            "children": [
                "./Continuous/gumbelDistributionPlot",
                "./Continuous/gumbelProbabilities",
                "./Continuous/gumbelQuantiles",
                "./Continuous/sampleGumbelDistribution"
            ]
        },
        {
            "name": t('distribution_Hypergeometric'),// {ns: 'menutoolbar'}),
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
            "name": t('distribution_Logistic'),// {ns: 'menutoolbar'}),
            "icon": "icon-logistic_white_comp",
            "children": [
                "./Continuous/logisticDistributionPlot",                
                "./Continuous/logisticProbabilities",
                "./Continuous/logisticQuantiles",
                "./Continuous/sampleLogisticDistribution"
            ]
        },
        {
            "name": t('distribution_Lognormal'),// {ns: 'menutoolbar'}),
            "icon": "icon-log-normal-distribution",
            "children": [
                "./Continuous/lognormalDistributionPlot",
                "./Continuous/lognormalProbabilities",
                "./Continuous/lognormalQuantiles",
                "./Continuous/sampleLognormalDistribution"
            ]
        },
        {
            "name": t('distribution_Negative_Binomial'),// {ns: 'menutoolbar'}),
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
            "name": t('distribution_Normal'),// {ns: 'menutoolbar'}),
            "icon": "icon-gaussian-function",
            "children": [
                "./Continuous/normalDistributionPlot",
                "./Continuous/normalProbabilities",
                "./Continuous/normalQuantiles",
                "./Continuous/sampleNormalDistribution"
            ]
        },
        {
            "name": t('distribution_Poisson'),// {ns: 'menutoolbar'}),
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
            "name": t('distribution_t'),// {ns: 'menutoolbar'}),
            "icon": "icon-tumblr",
            "children": [
                "./Continuous/tDistributionPlot",
                "./Continuous/tProbabilities",
                "./Continuous/tQuantiles",
                "./Continuous/sampletDistribution"
            ]
        },
        {
            "name": t('distribution_Uniform'),// {ns: 'menutoolbar'}),
            "icon": "icon-rectangle",
            "children": [
                "./Continuous/uniformDistributionPlot",
                "./Continuous/uniformProbabilities",
                "./Continuous/uniformQuantiles",
                "./Continuous/sampleUniformDistribution"
            ]
        },
        {
            "name": t('distribution_Weibull'),// {ns: 'menutoolbar'}),
            "icon": "icon-weibull_distribution",
            "children": [
                "./Continuous/weibullDistributionPlot",
                "./Continuous/weibullProbabilities",
                "./Continuous/weibullQuantiles",
                "./Continuous/sampleWeibullDistribution"
            ]
        }
        

    ]           
})

module.exports = {
    nav: nav(),
    render: () => nav()
}
