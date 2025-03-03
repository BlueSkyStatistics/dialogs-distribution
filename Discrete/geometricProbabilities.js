/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class geometricProbabilities extends baseModal {
    static dialogId = 'geometricProbabilities'
    static t = baseModal.makeT(geometricProbabilities.dialogId)

    constructor() {
        var config = {
            id: geometricProbabilities.dialogId,
            label: geometricProbabilities.t('title'),
            modalType: "one",
            RCode: `
                local(
                    {
                       .Table <- data.frame(Probability=stats::dgeom(0:10, prob={{selected.prob | safe}}))
                        rownames(.Table) <- (0:10)
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Geometric Probabilities")
                    }
                    )                
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: geometricProbabilities.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            }
        }
        const content = {
            items: [objects.prob.el.content],
            nav: {
                name: geometricProbabilities.t('navigation'),
                icon: "icon-area-chart-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: geometricProbabilities.t('help.title'),
            r_help: geometricProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: geometricProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new geometricProbabilities().render()
}
