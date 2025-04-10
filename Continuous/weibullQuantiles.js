/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class weibullQuantiles extends baseModal {
    static dialogId = 'weibullQuantiles'
    static t = baseModal.makeT(weibullQuantiles.dialogId)

    constructor() {
        var config = {
            id: weibullQuantiles.dialogId,
            label: weibullQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qweibull(c({{selected.prob | safe}}), shape={{selected.shape | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: weibullQuantiles.t('prob'),
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
                    label: weibullQuantiles.t('shape'),
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
                    label: weibullQuantiles.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: weibullQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: weibullQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: weibullQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.shape.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: weibullQuantiles.t('navigation'),
                icon: "icon-weibull_distribution-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: weibullQuantiles.t('help.title'),
            r_help: weibullQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: weibullQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new weibullQuantiles().render()
}
