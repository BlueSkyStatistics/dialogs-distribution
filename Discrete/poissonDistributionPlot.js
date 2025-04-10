/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class poissonDistributionPlot extends baseModal {
    static dialogId = 'poissonDistributionPlot'
    static t = baseModal.makeT(poissonDistributionPlot.dialogId)

    constructor() {
        var config = {
            id: poissonDistributionPlot.dialogId,
            label: poissonDistributionPlot.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the Poisson distribution  (qpois)  with p=0.0005 and p=0.9995 respectively 
                    lowProbBound =0.0005
                    upperProbBound=0.9995
                    lowerbound =qpois(p=lowProbBound, lambda={{selected.lambda | safe}})
                    upperbound =qpois(p=upperProbBound,  lambda={{selected.lambda | safe}})
                    .x <- round(seq(lowerbound, upperbound, length.out=1000) )
                if({{selected.a | safe}})
                {
                    RcmdrMisc::plotDistr(.x, stats::dpois(.x,  lambda={{selected.lambda | safe}}), xlab="x", 
                    ylab="Probability Mass", 
                    main="Poisson  Distribution:   
                    Mean={{selected.lambda | safe}}",   discrete=TRUE)
                }
                else
                {
                    RcmdrMisc::plotDistr(.x, stats::ppois(.x, lambda={{selected.lambda | safe}}), xlab="x",
                    ylab="Cumulative Probability", 
                    main="Poisson  Distribution:  
                    Mean={{selected.lambda | safe}}",   discrete=TRUE, cdf=TRUE)
                }
                
                }
                )                            
                `
        }
        var objects = {
            lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: poissonDistributionPlot.t('lambda'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            plotProb: { el: new radioButton(config, { label: poissonDistributionPlot.t('plotProb'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistrib: { el: new radioButton(config, { label: poissonDistributionPlot.t('plotDistrib'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.lambda.el.content, objects.plotProb.el.content, objects.plotDistrib.el.content],
            nav: {
                name: poissonDistributionPlot.t('navigation'),
                icon: "icon-fish-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: poissonDistributionPlot.t('help.title'),
            r_help: poissonDistributionPlot.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: poissonDistributionPlot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new poissonDistributionPlot().render()
}
