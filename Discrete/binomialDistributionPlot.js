/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class binomialDistributionPlot extends baseModal {
    static dialogId = 'binomialDistributionPlot'
    static t = baseModal.makeT(binomialDistributionPlot.dialogId)

    constructor() {
        var config = {
            id: binomialDistributionPlot.dialogId,
            label: binomialDistributionPlot.t('title'),
            modalType: "one",
            RCode: `
                local(
                    {
                    #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the Binomial distribution  (qbinom)  with p=0.0005 and p=0.9995 respectively 
                        lowProbBound =0.0005
                        upperProbBound=0.9995
                        lowerbound =qbinom(p=lowProbBound, size={{selected.size | safe}}, prob={{selected.prob | safe}})
                        upperbound =qbinom(p=upperProbBound, size={{selected.size | safe}}, prob={{selected.prob | safe}})
                        .x <- round(seq(lowerbound, upperbound, length.out=1000) )
                    if({{selected.a | safe}})
                    {
                        RcmdrMisc::plotDistr(.x, stats::dbinom(.x, size={{selected.size | safe}}, prob={{selected.prob | safe}}), xlab="Number of Successes", 
                        ylab="Probability Mass", 
                        main="Binomial Distribution:  Binomial trials={{selected.size | safe}}, 
                        Probability of success={{selected.prob | safe}}",   discrete=TRUE)
                    }
                    else
                    {
                    RcmdrMisc::plotDistr(.x, stats::pbinom(.x, size={{selected.size | safe}}, {{selected.prob | safe}}), xlab="Number of Successes",
                        ylab="Cumulative Probability", 
                        main="Binomial Distribution:  Binomial trials={{selected.size | safe}}, 
                        Probability of success={{selected.prob | safe}}",   discrete=TRUE, cdf=TRUE)
                    }
                    
                    }
                    )                        
                `
        }
        var objects = {
            size: {
                el: new input(config, {
                    no: 'size',
                    label: binomialDistributionPlot.t('size'),
                    required: true,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: binomialDistributionPlot.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            
            plotProb: { el: new radioButton(config, { label: binomialDistributionPlot.t('plotProb'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistrib: { el: new radioButton(config, { label: binomialDistributionPlot.t('plotDistrib'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.size.el.content, objects.prob.el.content, objects.plotProb.el.content, objects.plotDistrib.el.content],
            nav: {
                name: binomialDistributionPlot.t('navigation'),
                icon: "icon-binary-code-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: binomialDistributionPlot.t('help.title'),
            r_help: binomialDistributionPlot.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: binomialDistributionPlot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new binomialDistributionPlot().render()
}
