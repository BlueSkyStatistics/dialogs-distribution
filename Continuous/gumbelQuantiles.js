/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class gumbelQuantiles extends baseModal {
    static dialogId = 'gumbelQuantiles'
    static t = baseModal.makeT(gumbelQuantiles.dialogId)

    constructor() {
        var config = {
            id: gumbelQuantiles.dialogId,
            label: gumbelQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  RcmdrMisc::qgumbel(c({{selected.prob | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: gumbelQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            location: {
                el: new input(config, {
                    no: 'location',
                    label: gumbelQuantiles.t('location'),
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
                    label: gumbelQuantiles.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: gumbelQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: gumbelQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: gumbelQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: gumbelQuantiles.t('navigation'),
                icon: "icon-gumbel-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: gumbelQuantiles.t('help.title'),
            r_help: gumbelQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: gumbelQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new gumbelQuantiles().render()
}
