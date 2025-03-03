/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class hypergeometricDistributionPlot extends baseModal {
    static dialogId = 'hypergeometricDistributionPlot'
    static t = baseModal.makeT(hypergeometricDistributionPlot.dialogId)

    constructor() {
        var config = {
            id: hypergeometricDistributionPlot.dialogId,
            label: hypergeometricDistributionPlot.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                 #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the Hyper-geometric distribution  (qhyper)  with p=0.0005 and p=0.9995 respectively 
                  lowProbBound =0.0005
                  upperProbBound=0.9995
                  lowerbound =qhyper(p=lowProbBound, m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}})
                  upperbound =qhyper(p=upperProbBound, m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}})
                  .x <- round (seq(lowerbound, upperbound, length.out=1000))
                if({{selected.a | safe}})
                {
                
                  RcmdrMisc::plotDistr(.x, stats::dhyper(.x, m={{selected.m | safe}}, n={{selected.n | safe}} , k={{selected.k | safe}}), xlab="Number of White Balls in Sample", 
                  ylab="Probability Mass", 
                  main="Hypergeometric Distribution:  m={{selected.m | safe}}, n={{selected.n | safe}} , k={{selected.k | safe}}",   discrete=TRUE)
                }
                else
                {
                RcmdrMisc::plotDistr(.x, stats::phyper(.x, m={{selected.m | safe}}, n={{selected.n | safe}} , k={{selected.k | safe}}), xlab="Number of White Balls in Sample",
                  ylab="Cumulative Probability", 
                main="Hypergeometric Distribution:  m={{selected.m | safe}}, n={{selected.n | safe}} , k={{selected.k | safe}}",   discrete=TRUE, cdf=TRUE)
                }
                
                }
                )                 
                `
        }
        var objects = {
            m: {
                el: new input(config, {
                    no: 'm',
                    label: hypergeometricDistributionPlot.t('m'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            n: {
                el: new input(config, {
                    no: 'n',
                    label: hypergeometricDistributionPlot.t('n'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            k: {
                el: new input(config, {
                    no: 'k',
                    label: hypergeometricDistributionPlot.t('k'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            }, 
            labelSig: { el: new labelVar(config, { label: hypergeometricDistributionPlot.t('labelSig'), style: "mt-3",h: 6 }) },
            plotProb: { el: new radioButton(config, { label: hypergeometricDistributionPlot.t('plotProb'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistr: { el: new radioButton(config, { label: hypergeometricDistributionPlot.t('plotDistr'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }  
        }
        const content = {
            items: [objects.m.el.content, objects.n.el.content, objects.k.el.content, objects.labelSig.el.content, objects.plotProb.el.content, objects.plotDistr.el.content],
            nav: {
                name: hypergeometricDistributionPlot.t('navigation'),
                icon: "icon-curve-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: hypergeometricDistributionPlot.t('help.title'),
            r_help: hypergeometricDistributionPlot.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: hypergeometricDistributionPlot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new hypergeometricDistributionPlot().render()
}
