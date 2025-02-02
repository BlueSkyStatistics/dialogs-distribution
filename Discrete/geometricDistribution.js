





class geometricDistribution extends baseModal {
    static dialogId = 'geometricDistribution'
    static t = baseModal.makeT(geometricDistribution.dialogId)

    constructor() {
        var config = {
            id: geometricDistribution.dialogId,
            label: geometricDistribution.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the Geometric distribution  (qgeom)  with p=0.0005 and p=0.9995 respectively 
                    lowProbBound =0.0005
                    upperProbBound=0.9995
                    lowerbound =qgeom(p=lowProbBound, prob={{selected.prob | safe}})
                    upperbound =qgeom(p=upperProbBound,  prob={{selected.prob | safe}})
                    .x <- round(seq(lowerbound, upperbound, length.out=1000) )
                if({{selected.a | safe}})
                {
                    RcmdrMisc::plotDistr(.x, stats::dgeom(.x,  prob={{selected.prob | safe}}), xlab="Number of Failures until Success", 
                    ylab="Probability Mass", 
                    main="Geometric Distribution:   
                    Probability of success={{selected.prob | safe}}",   discrete=TRUE)
                }
                else
                {
                    RcmdrMisc::plotDistr(.x, stats::pgeom(.x, prob={{selected.prob | safe}}), xlab="Number of Failures until Success",
                    ylab="Cumulative Probability", 
                    main="Geometric Distribution:  
                    Probability of success={{selected.prob | safe}}",   discrete=TRUE, cdf=TRUE)
                }
                
                }
                )                            
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: geometricDistribution.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            
            plotProb: { el: new radioButton(config, { label: geometricDistribution.t('plotProb'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistrib: { el: new radioButton(config, { label: geometricDistribution.t('plotDistrib'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.plotProb.el.content, objects.plotDistrib.el.content],
            nav: {
                name: geometricDistribution.t('navigation'),
                icon: "icon-area-chart-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: geometricDistribution.t('help.title'),
            r_help: geometricDistribution.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: geometricDistribution.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new geometricDistribution().render()
}
