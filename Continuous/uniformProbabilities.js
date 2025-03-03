/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class uniformProbabilities extends baseModal {
    static dialogId = 'uniformProbabilities'
    static t = baseModal.makeT(uniformProbabilities.dialogId)

    constructor() {
        var config = {
            id: uniformProbabilities.dialogId,
            label: uniformProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::punif(c({{selected.varvals | safe}}), min={{selected.min | safe}}, max={{selected.max | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: uniformProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            min: {
                el: new input(config, {
                    no: 'min',
                    label: uniformProbabilities.t('min'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            max: {
                el: new input(config, {
                    no: 'max',
                    label: uniformProbabilities.t('max'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: uniformProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: uniformProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: uniformProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.min.el.content, objects.max.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: uniformProbabilities.t('navigation'),
                icon: "icon-rectangle-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: uniformProbabilities.t('help.title'),
            r_help: uniformProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: uniformProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new uniformProbabilities().render()
}
