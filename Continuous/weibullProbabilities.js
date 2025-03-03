/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class weibullProbabilities extends baseModal {
    static dialogId = 'weibullProbabilities'
    static t = baseModal.makeT(weibullProbabilities.dialogId)

    constructor() {
        var config = {
            id: weibullProbabilities.dialogId,
            label: weibullProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pweibull(c({{selected.varvals | safe}}), shape={{selected.shape | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: weibullProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            shape: {
                el: new input(config, {
                    no: 'shape',
                    label: weibullProbabilities.t('shape'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: weibullProbabilities.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: weibullProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: weibullProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: weibullProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.shape.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: weibullProbabilities.t('navigation'),
                icon: "icon-weibull_distribution-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: weibullProbabilities.t('help.title'),
            r_help: weibullProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: weibullProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new weibullProbabilities().render()
}
