/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class geometricTailProbabilities extends baseModal {
    static dialogId = 'geometricTailProbabilities'
    static t = baseModal.makeT(geometricTailProbabilities.dialogId)

    constructor() {
        var config = {
            id: geometricTailProbabilities.dialogId,
            label: geometricTailProbabilities.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::pgeom(c({{selected.varvals | safe}}), prob={{selected.prob | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: geometricTailProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: geometricTailProbabilities.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            labelSig: { el: new labelVar(config, { label: geometricTailProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: geometricTailProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: geometricTailProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.prob.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: geometricTailProbabilities.t('navigation'),
                icon: "icon-area-chart-t",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: geometricTailProbabilities.t('help.title'),
            r_help: geometricTailProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: geometricTailProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new geometricTailProbabilities().render()
}
