import React, { useCallback, useState, useEffect } from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import { v4 as uuidV4 } from "uuid";

import {
  BoltIcon,
  CheckIcon,
  FireIcon,
  HomeIcon,
  XMarkIcon,
  EnvelopeIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ConfirmAdd from "@/components/ConfirmAdd";
import RichText from "@/components/RichText";
import { ROOT_URL } from "@/env";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import mail from "@/config/mailer/mail";
import PreviewModal from "@/components/PreviewModal";
import { Calendar } from "react-date-range";
import TimePicker from "react-time-picker";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import moment from "moment";

const getListFollowers = (data) => {
  return data.map((follower) => {
    return follower.email;
  });
};

const FormArticle = ({
  header,
  submitBtn,
  setModalShow,
  uploadFile,
  pushBtn,
  listCategories,
  articleData,
  dispatchArticle,
  listFollowers,
}) => {
  const lang = [
    { tag: "fr", langue: "français" },
    { tag: "en", langue: "Anglais" },
  ];
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(listCategories[0]);
  const [selectedLang, setSelectedLang] = useState(lang[0]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState(articleData.title);
  const [author, setAuthor] = useState("");
  const [descript, setDescript] = useState(articleData.description);
  const [hastag, setHastag] = useState();
  const [files, setFiles] = useState();
  const [flash, setFlash] = useState(false);
  const [hot, setHot] = useState(false);
  const [slide, setSlide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [path, setPath] = useState();
  const [dataPreview, setDataPreview] = useState();

  const newArticleData = articleData;
  var richtextVal = "";
  const listFollowersTab = pushBtn ? getListFollowers(listFollowers) : [];
  const [isMailing, setIsMailing] = useState(false);

  const linkBeautify = (link) => {
    const newLink = link.replace(/[?%';:,\s\u2019]/g, "-");
    return newLink.toLowerCase();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const richTextHandler = (val) => {
    console.log("tap = ", val);
  };

  const getTitle = (val) => {
    setTitle(val);
  };
  const getAuthor = (val) => {
    setAuthor(val);
  };
  const getDescript = (val) => {
    setDescript(val);
  };

  const getHastag = (val) => {
    setHastag(val);
  };

  const getPath = (val) => {
    setPath(val);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   PREVIEW                                  */
  /* -------------------------------------------------------------------------- */
  const previewHandler = () => {
    let isEmpty = 0;

    const fileTmp = [];

    if (files[0]) {
      fileTmp.push(files[0]);
    }

    if (files[1]) {
      fileTmp.push(files[1]);
    }

    if (files[2]) {
      fileTmp.push(files[2]);
    }
    const tmpDataPrev = {
      media: fileTmp,
      title: title,
      description: descript,
      body: value,
      path: path,
    };

    for (const prop in tmpDataPrev) {
      if (!tmpDataPrev[prop]) isEmpty++;
    }

    if (!isEmpty) {
      if (files) {
        setPreviewModal(!previewModal);
        setDataPreview(tmpDataPrev);
      } else {
        toast.error("Sélectionner au moin une image");
      }
    } else {
      toast.error("Tous les champs sont obligatoires");
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                 PROGRAMMER                                 */
  /* -------------------------------------------------------------------------- */
  const [date, setDate] = useState(null);
  const [timeValue, onChangeTime] = useState("10:00");

  const calendarChange = (val) => {
    setDate(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {};
    // console.log("selectedMenu == ", selectedMenu)
    // console.log("selectedLang == ", selectedLang)
    // console.log("RichText Value == ", value)
    // console.log("Titre === ", title)
    // console.log("Description === ", descript)

    let formData1 = new FormData();
    let formData2 = new FormData();
    let formData3 = new FormData();
    let checkImage = [];
    let isEmpty = 0;

    /* -------------------------------------------------------------------------- */
    /*                       REHEFA AO AMIN'NY AJOUT ARTICLE                      */
    /* -------------------------------------------------------------------------- */
    if (!pushBtn) {
      //condition oe reef ao amin'ny ajout article

      if (files) {
        if (files[0]) {
          formData1.append("file", files[0]);
          const isImg1 = files[0].type.split("/");
          if (isImg1[0] === "image") {
            checkImage.push(isImg1[0]);
          }
        }
        if (files[1]) {
          formData2.append("file", files[1]);
          const isImg2 = files[1].type.split("/");
          if (isImg2[0] === "image") {
            checkImage.push(isImg2[0]);
          }
        }
        if (files[2]) {
          formData3.append("file", files[2]);
          const isImg3 = files[2].type.split("/");
          if (isImg3[0] === "image") {
            checkImage.push(isImg3[0]);
          }
        }
      }

      // console.log("files == ", files)

      data.title = title;
      data.description = descript;
      data.author = author;
      data.body = value;
      data.category_id = selectedMenu.id;
      data.lang = selectedLang.tag;
      data.path = path;

      for (const prop in data) {
        if (!data[prop]) isEmpty++;
      }

      if (!isEmpty && value.length !== 11) {
        // 11 satria io no valeur reef tsis soratra "<p><br></p>"

        if (files) {
          if (files.length <= 3) {
            if (checkImage.length) {
              // check-na oe tsy maintsy misy image na ray fotsiny aza
              setStatus(false);
              const param = { query: "addArticle", param: [data] };
              fetch(`${ROOT_URL}/api/knexApi`, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((res) => res.json())
                .then(async (article) => {
                  /* -------------------------------------------------------------------------- */
                  /*                               AJOUT PROGRAMME                              */
                  /* -------------------------------------------------------------------------- */

                  if (isChecked) {
                    const dateVal = moment(date).format("DD-MM-YYYY");
                    const hourVal = moment(timeValue, "HH:mm");
                    const fullDate = moment(dateVal).set({
                      hour: hourVal.hour(),
                      minute: hourVal.minute(),
                    });
                    const programVal = {
                      id: article.result[0].id,
                      program: true,
                      date_program: fullDate,
                    };
                    const paramProgram = {
                      query: "updateProgramArticle",
                      param: [programVal],
                    };
                    await fetch(`${ROOT_URL}/api/knexApi`, {
                      method: "POST",
                      body: JSON.stringify(paramProgram),
                      headers: {
                        "Content-type": "application/json",
                      },
                    }).then((res) => res.json());
                  }

                  /* -------------------------------------------------------------------------- */
                  /*                                HASTAG SYSTEM                               */
                  /* -------------------------------------------------------------------------- */

                  const hastag_articles = [];

                  if (hastag) {
                    const tabHastag = hastag.trim().split(",");
                    const listHastag = tabHastag.map((hastag) => {
                      return hastag.trim();
                    });
                    // console.log("hastag liste == ", listHastag)
                    const paramHastag = {
                      query: "addHastag",
                      param: [listHastag, selectedLang.tag],
                    };
                    await fetch(`${ROOT_URL}/api/knexApi`, {
                      method: "POST",
                      body: JSON.stringify(paramHastag),
                      headers: {
                        "Content-type": "application/json",
                      },
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        // console.log("les id de hastag == ", data)
                        data.result.forEach((hastagID) => {
                          hastag_articles.push({
                            article_id: article.result[0].id,
                            hastag_id: hastagID,
                          });
                        });

                        /* -------------------------------------------------------------------------- */
                        /*                            AJOUT HASTAG ARTICLE                            */
                        /* -------------------------------------------------------------------------- */

                        const paramHastagArticle = {
                          query: "addHastagArticle",
                          param: [hastag_articles],
                        };
                        fetch(`${ROOT_URL}/api/knexApi`, {
                          method: "POST",
                          body: JSON.stringify(paramHastagArticle),
                          headers: {
                            "Content-type": "application/json",
                          },
                        })
                          .then((res) => res.json())
                          .then((data) => {});
                      });
                  }

                  /* ------- *********************************************************** ------ */

                  /* -------------------------------------------------------------------------- */
                  /*              mi-upload ny image voalohany mo mety ho video                 */
                  /* -------------------------------------------------------------------------- */
                  if (files[0]) {
                    const type1 = files[0].type.split("/");
                    fetch(`${ROOT_URL}/api/upload`, {
                      ///mi-ajout ny image 1
                      method: "POST",
                      body: formData1,
                      "content-type": "multipart/form-data",
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (type1[0] === "image") {
                          const image1 = {
                            article_id: article.result[0].id,
                            ...data.result,
                          };
                          /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                          const param7 = { query: "addImage", param: [image1] };
                          fetch(`${ROOT_URL}/api/knexApi`, {
                            method: "POST",
                            body: JSON.stringify(param7),
                            headers: {
                              "Content-type": "application/json",
                            },
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              /* -------------------------------------------------------------------------- */
                              /*                   mi-upload ny image 2 indray ra mi-exist                  */
                              /* -------------------------------------------------------------------------- */
                              if (files[1]) {
                                const type2 = files[1].type.split("/");
                                fetch(`${ROOT_URL}/api/upload`, {
                                  ///mi-ajout ny image 2
                                  method: "POST",
                                  body: formData2,
                                  "content-type": "multipart/form-data",
                                })
                                  .then((res) => res.json())
                                  .then((data2) => {
                                    if (type2[0] === "image") {
                                      const image2 = {
                                        article_id: article.result[0].id,
                                        ...data2.result,
                                      };
                                      /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                      const param2 = {
                                        query: "addImage",
                                        param: [image2],
                                      };
                                      fetch(`${ROOT_URL}/api/knexApi`, {
                                        method: "POST",
                                        body: JSON.stringify(param2),
                                        headers: {
                                          "Content-type": "application/json",
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((data) => {
                                          /* -------------------------------------------------------------------------- */
                                          /*                             mi-ajout ny image 3                            */
                                          /* -------------------------------------------------------------------------- */
                                          if (files[2]) {
                                            const type3 =
                                              files[2].type.split("/");
                                            fetch(`${ROOT_URL}/api/upload`, {
                                              ///mi-ajout ny image 3
                                              method: "POST",
                                              body: formData3,
                                              "content-type":
                                                "multipart/form-data",
                                            })
                                              .then((res) => res.json())
                                              .then((data33) => {
                                                // console.log("data3 == ", data33)

                                                if (type3[0] === "image") {
                                                  const image3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data33.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param3 = {
                                                    query: "addImage",
                                                    param: [image3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param3
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                } else {
                                                  const video3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data33.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param6 = {
                                                    query: "addVideo",
                                                    param: [video3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param6
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                }
                                              });
                                          } else {
                                            setIsLoading(false);
                                            router.refresh();
                                          }
                                        });
                                    } else {
                                      const video2 = {
                                        article_id: article.result[0].id,
                                        ...data2.result,
                                      };
                                      /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                      const param5 = {
                                        query: "addVideo",
                                        param: [video2],
                                      };
                                      fetch(`${ROOT_URL}/api/knexApi`, {
                                        method: "POST",
                                        body: JSON.stringify(param5),
                                        headers: {
                                          "Content-type": "application/json",
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((data) => {
                                          /* -------------------------------------------------------------------------- */
                                          /*                             mi-ajout ny image 3                            */
                                          /* -------------------------------------------------------------------------- */
                                          if (files[2]) {
                                            const type3 =
                                              files[2].type.split("/");
                                            fetch(`${ROOT_URL}/api/upload`, {
                                              ///mi-ajout ny image 3
                                              method: "POST",
                                              body: formData3,
                                              "content-type":
                                                "multipart/form-data",
                                            })
                                              .then((res) => res.json())
                                              .then((data3) => {
                                                if (type3[0] === "image") {
                                                  const image3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data3.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param3 = {
                                                    query: "addImage",
                                                    param: [image3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param3
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                } else {
                                                  const video3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data3.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param6 = {
                                                    query: "addVideo",
                                                    param: [video3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param6
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                }
                                              });
                                          } else {
                                            setIsLoading(false);
                                            router.refresh();
                                          }
                                        });
                                    }
                                  });
                              } else {
                                setIsLoading(false);
                                router.refresh();
                              }
                            });
                        } else {
                          const video1 = {
                            article_id: article.result[0].id,
                            ...data.result,
                          };
                          /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                          const param1 = { query: "addVideo", param: [video1] };
                          fetch(`${ROOT_URL}/api/knexApi`, {
                            method: "POST",
                            body: JSON.stringify(param1),
                            headers: {
                              "Content-type": "application/json",
                            },
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              /* -------------------------------------------------------------------------- */
                              /*                   mi-upload ny image 2 indray ra mi-exist                  */
                              /* -------------------------------------------------------------------------- */
                              if (files[1]) {
                                const type2 = files[1].type.split("/");
                                fetch(`${ROOT_URL}/api/upload`, {
                                  ///mi-ajout ny image 2
                                  method: "POST",
                                  body: formData2,
                                  "content-type": "multipart/form-data",
                                })
                                  .then((res) => res.json())
                                  .then((data2) => {
                                    if (type2[0] === "image") {
                                      const image2 = {
                                        article_id: article.result[0].id,
                                        ...data2.result,
                                      };
                                      /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                      const param2 = {
                                        query: "addImage",
                                        param: [image2],
                                      };
                                      fetch(`${ROOT_URL}/api/knexApi`, {
                                        method: "POST",
                                        body: JSON.stringify(param2),
                                        headers: {
                                          "Content-type": "application/json",
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((data) => {
                                          /* -------------------------------------------------------------------------- */
                                          /*                             mi-ajout ny image 3                            */
                                          /* -------------------------------------------------------------------------- */
                                          if (files[2]) {
                                            const type3 =
                                              files[2].type.split("/");
                                            fetch(`${ROOT_URL}/api/upload`, {
                                              ///mi-ajout ny image 3
                                              method: "POST",
                                              body: formData3,
                                              "content-type":
                                                "multipart/form-data",
                                            })
                                              .then((res) => res.json())
                                              .then((data3) => {
                                                if (type3[0] === "image") {
                                                  const image3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data3.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param3 = {
                                                    query: "addImage",
                                                    param: [image3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param3
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                } else {
                                                  const video3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data3.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param6 = {
                                                    query: "addVideo",
                                                    param: [video3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param6
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                }
                                              });
                                          } else {
                                            setIsLoading(false);
                                            router.refresh();
                                          }
                                        });
                                    } else {
                                      const video2 = {
                                        article_id: article.result[0].id,
                                        ...data2.result,
                                      };
                                      /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                      const param5 = {
                                        query: "addVideo",
                                        param: [video2],
                                      };
                                      fetch(`${ROOT_URL}/api/knexApi`, {
                                        method: "POST",
                                        body: JSON.stringify(param5),
                                        headers: {
                                          "Content-type": "application/json",
                                        },
                                      })
                                        .then((res) => res.json())
                                        .then((data) => {
                                          /* -------------------------------------------------------------------------- */
                                          /*                             mi-ajout ny image 3                            */
                                          /* -------------------------------------------------------------------------- */
                                          if (files[2]) {
                                            const type3 =
                                              files[2].type.split("/");
                                            fetch(`${ROOT_URL}/api/upload`, {
                                              ///mi-ajout ny image 3
                                              method: "POST",
                                              body: formData3,
                                              "content-type":
                                                "multipart/form-data",
                                            })
                                              .then((res) => res.json())
                                              .then((data3) => {
                                                if (type3[0] === "image") {
                                                  const image3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data3.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param3 = {
                                                    query: "addImage",
                                                    param: [image3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param3
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                } else {
                                                  const video3 = {
                                                    article_id:
                                                      article.result[0].id,
                                                    ...data3.result,
                                                  };
                                                  /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param6 = {
                                                    query: "addVideo",
                                                    param: [video3],
                                                  };
                                                  fetch(
                                                    `${ROOT_URL}/api/knexApi`,
                                                    {
                                                      method: "POST",
                                                      body: JSON.stringify(
                                                        param6
                                                      ),
                                                      headers: {
                                                        "Content-type":
                                                          "application/json",
                                                      },
                                                    }
                                                  )
                                                    .then((res) => res.json())
                                                    .then((result) => {
                                                      setIsLoading(false);
                                                      router.refresh();
                                                    });
                                                }
                                              });
                                          } else {
                                            setIsLoading(false);
                                            router.refresh();
                                          }
                                        });
                                    }
                                  });
                              } else {
                                setIsLoading(false);
                                router.refresh();
                              }
                            });
                        }
                      });
                  }
                });
            } else {
              toast.error("Ajouter aux moin une Image");
              setIsLoading(false);
            }
          } else {
            toast.error("3 médias maximum");
            setIsLoading(false);
          }
        } else {
          toast.error("Image obligatoire");
          setIsLoading(false);
        }
      } else {
        toast.error("Tous les champs sont obligatoire");
        setIsLoading(false);
      }
    } else {
      /* -------------------------------------------------------------------------- */
      /*                   REHEFA AO AMIN'NY MODIFICATION ARTICLE                   */
      /* -------------------------------------------------------------------------- */

      // console.log('articleData.title == ', articleData.title)
      // console.log('title == ', title)
      // console.log('articleData.description == ', articleData.description)
      // console.log('Description == ', descript)
      // console.log('articleData.body == ', articleData.body)
      // console.log('body == ', value)

      if (title && descript && value) {
        const modifData = {
          id: articleData.id,
          title: title,
          description: descript,
          body: value,
          category_id: selectedMenu.id,
          lang: selectedLang.tag,
        };

        const paramModif = { query: "updateArticle", param: [modifData] };
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(paramModif),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            newArticleData.title = title;
            newArticleData.description = descript;
            newArticleData.body = value;
            newArticleData.lang = selectedLang.tag;
            newArticleData.category_en = selectedMenu.en;
            newArticleData.category_fr = selectedMenu.fr;
            dispatchArticle({ type: "ONECHANGE", result: newArticleData }); // pour changer instantanément la liste article

            setIsLoading(false);
            setModalShow(false);
          });
      } else {
        setIsLoading(false);
      }
    }

    // await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    //   "content-type": "multipart/form-data"
    // }).then(res => res.json())
    // .then(data => console.log("ajout test data file réussi"))
  };

  const toggleConfirmModal = useCallback(() => {
    setConfirmModal(!confirmModal);
  }, [confirmModal]);

  useEffect(() => {
    setValue(articleData.body);
    setFlash(articleData.flash);
    setHot(articleData.hot);
    setSlide(articleData.slide);

    if (articleData.category_en) {
      setSelectedMenu(
        listCategories.find((item) => item.en === articleData.category_en)
      );
    }

    if (articleData.lang) {
      setSelectedLang(lang.find((item) => item.tag === articleData.lang));
    }
  }, []);

  const flashStyle = flash ? "bg-red-600" : "bg-main-500";
  const hotStyle = hot ? "bg-orange-600" : "bg-main-500";
  const slideStyle = slide ? "bg-blue-600" : "bg-main-500";

  const flashHandler = () => {
    const param = { query: "checkFlash", param: [true, articleData.lang] };
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const numberOfFlash = data.result[0].flash;
        if (numberOfFlash > 3 && !flash) {
          toast.error("Nombre maximal atteint!");
        } else {
          const flashParam = {
            query: "updateFlash",
            param: [articleData.id, !flash],
          };
          fetch(`${ROOT_URL}/api/knexApi`, {
            method: "POST",
            body: JSON.stringify(flashParam),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("mise à jour réussi avec succès!");
              newArticleData.flash = !flash;
              dispatchArticle({ type: "ONECHANGE", result: newArticleData });
              setFlash(!flash);
            });
        }
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                          ENVOIE EMAIL TO FOLLOWERS                         */
  /* -------------------------------------------------------------------------- */
  // console.log("mail === ",mail({
  //   title: articleData.title,
  //   description: articleData.description,
  //   //labelBtn: "Visiter",
  //   imgSrc: "https://images.axios.com/2PBI0VSjjFtyFv2aI8i13mvH2uc=/0x215:3286x2063/1920x1080/2022/11/19/1668875430297.jpg",
  //   link: `${ROOT_URL}/article/${articleData.id}/${linkBeautify(articleData.title)}`
  // }))
  const sendMailing = () => {
    setIsMailing(true);
    // console.log("to = ", listFollowers);
    // console.log("title = ", articleData.title);
    // console.log("description = ", articleData.description);
    try {
      if (listFollowersTab.length) {
        const theMail = {
          to: listFollowersTab,
          subject: "test subject",

          message: mail({
            title: articleData.title,
            description: articleData.description,
            //labelBtn: "Visiter",
            imgSrc: `${ROOT_URL}/_next/image?url=%2Fuploads%2Fimages%2F${articleData.image[0].image_name}.${articleData.image[0].image_extension}&w=1920&q=75`,
            link: `${ROOT_URL}/article/${articleData.id}/${linkBeautify(
              articleData.title
            )}`,
            logoSrc: `${ROOT_URL}/_next/image?url=%2Fassets%2Fimg%2FLogo002.png&w=1920&q=75`,
            bgSrc: `${ROOT_URL}/_next/image?url=%2Fassets%2Fimg%2FHeader-bg.png&w=1920&q=75`,
            linkReporter: ROOT_URL,
          }),
        };

        fetch(`${ROOT_URL}/api/mailing`, {
          method: "POST",
          body: JSON.stringify(theMail),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            toast.success("Email envoyer avec succès");
            setIsMailing(false);
          });
      } else {
        toast.error("Il n'y a pas d'abonner pour le moment");
        setIsMailing(false);
      }
    } catch (error) {
      toast.error("Une erreur c'est produit");
      setIsMailing(false);
      // console.log("erreur : ", error);
    }
  };

  const slideHandler = () => {
    const param = { query: "checkSlide", param: [true, articleData.lang] };
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const numberOfSlide = data.result[0].slide;
        if (numberOfSlide >= 4 && slide) {
          toast.error("Nombre maximal atteint!");
        } else {
          const slideParam = {
            query: "updateSlide",
            param: [articleData.id, !slide],
          };
          fetch(`${ROOT_URL}/api/knexApi`, {
            method: "POST",
            body: JSON.stringify(slideParam),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("mise à jour réussi avec succès!");
              newArticleData.slide = !slide;
              dispatchArticle({ type: "ONECHANGE", result: newArticleData });
              setSlide(!slide);
            });
        }
      });
  };
  const hotHandler = () => {
    const param = { query: "checkHot", param: [true, articleData.lang] };
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const numberOfHot = data.result[0].hot;
        if (numberOfHot >= 1 && !hot) {
          toast.error("Nombre maximal atteint!");
        } else {
          const hotParam = {
            query: "updateHot",
            param: [articleData.id, !hot],
          };
          fetch(`${ROOT_URL}/api/knexApi`, {
            method: "POST",
            body: JSON.stringify(hotParam),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("mise à jour réussi avec succès!");
              newArticleData.hot = !hot;
              dispatchArticle({ type: "ONECHANGE", result: newArticleData });
              setHot(!hot);
            });
        }
      });
  };

  return (
    <>
      <section className={`mx-auto w-[90%]`}>
        <h3 className=" mb-4 text-xl font-semibold tracking-wide">{header}</h3>
        <Toaster
          toastOptions={{
            className: "text-sm",
          }}
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-6 ">
            <div
              className={`flex flex-col gap-4 ${
                uploadFile ? "w-1/2" : "w-full"
              } h-fit`}
            >
              <Input
                id="titre"
                label="Titre"
                required
                type="text"
                onChange={getTitle}
                defaultValue={articleData.title}
                status={status}
              />
              <Input
                id="description"
                required
                type="text"
                name="description"
                textarea
                placeholder="Description"
                onChange={getDescript}
                defaultValue={articleData.description}
              />
              {!pushBtn && (
                <Input
                  id="auteur"
                  label="Auteur"
                  required
                  type="text"
                  onChange={getAuthor}
                  defaultValue={""}
                />
              )}

              <div className="flex w-full gap-4">
                <Listbox value={selectedMenu} onChange={setSelectedMenu}>
                  <div className="relative flex w-full flex-col">
                    <Listbox.Button className="flex items-center justify-between rounded-full border border-main-500 p-4 text-main-500">
                      <p className="">{selectedMenu.fr}</p>
                      <ChevronDownIcon className="block h-4" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-16 z-40 rounded-md border border-main-500  bg-white p-2 shadow-md">
                      {listCategories.map((category) => (
                        <Listbox.Option
                          key={uuidV4()}
                          value={category}
                          className="cursor-pointer rounded-lg px-2 py-1 ui-active:bg-main-500 ui-active:text-white"
                        >
                          {category.fr}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
                <Listbox value={selectedLang} onChange={setSelectedLang}>
                  <div className="relative flex w-full flex-col">
                    <Listbox.Button className="flex items-center justify-between rounded-full border border-main-500 p-4 text-main-500">
                      <p className="">{selectedLang.langue}</p>
                      <ChevronDownIcon className="block h-4" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-16 z-40 rounded-md border border-main-500  bg-white p-2 shadow-md">
                      {lang.map((item) => (
                        <Listbox.Option
                          key={uuidV4()}
                          value={item}
                          className="cursor-pointer rounded-lg px-2 py-1 ui-active:bg-main-500 ui-active:text-white"
                        >
                          {item.langue}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <Input
                id="tags"
                label="#Hashtag séparé par virgule(,)"
                name="tags"
                required
                type="text"
                onChange={getHastag}
                defaultValue={""}
              />

              {/* Eto ilay resaka input vaovao */}
              <Input
                id="sousmenu"
                label="Sous menu"
                name="sousmenu"
                required
                type="text"
                onChange={getPath}
                defaultValue={""}
              />

              {/* programmer */}
              <div className="space-x-2">
                <input
                  type="checkbox"
                  id="check"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="check">Programmer la diffusion</label>
              </div>

              {isChecked && (
                <div className="flex w-fit flex-col">
                  <TimePicker onChange={onChangeTime} value={timeValue} />
                  <Calendar
                    date={date}
                    color={["#3e817d"]}
                    onChange={calendarChange}
                  />
                </div>
              )}

              {pushBtn && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex items-center ${flashStyle} gap-2 rounded-lg p-2 text-white transition active:scale-95`}
                    onClick={flashHandler}
                  >
                    <BoltIcon className="h-5" />
                    <span>Flash info</span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center ${slideStyle} gap-2 rounded-lg p-2 text-white transition active:scale-95`}
                    onClick={slideHandler}
                  >
                    <HomeIcon className="h-5" />
                    <span>Slider</span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center ${hotStyle} gap-2 rounded-lg p-2 text-white transition active:scale-95`}
                    onClick={hotHandler}
                  >
                    <FireIcon className="h-5" />
                    <span>Hot staff</span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center ${
                      isMailing ? "bg-gray-300" : "bg-[#64645A]"
                    } gap-2 rounded-lg p-2 text-white transition active:scale-95`}
                    onClick={sendMailing}
                  >
                    {isMailing ? (
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <EnvelopeIcon className="h-5" />
                    )}

                    <span>Envoyer aux abonnés</span>
                  </button>
                </div>
              )}
            </div>

            {uploadFile && (
              <div className="flex-1">
                <UploadFile onChangeFile={setFiles} isMultiple={true} />
              </div>
            )}
          </div>

          {/* rich text content */}
          <RichText theme="snow" value={value} setValue={setValue} />

          <div className="mt-8 flex gap-12">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-[#555555] px-4 py-2 font-semibold text-white shadow-md active:scale-95"
              onClick={() => setModalShow(false)}
              disabled={isLoading}
            >
              <XMarkIcon className="h-5" />
              <span>Annuler</span>
            </button>

            <button
              type="submit"
              className={`flex items-center ${
                isLoading ? "bg-gray-400" : "bg-main-500"
              } gap-2 rounded-full px-4 py-2 font-semibold text-white shadow-md active:scale-95`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <CheckIcon className="h-5" />
              )}

              <span>{submitBtn}</span>
            </button>

            {/* Preview */}
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-gray-500  px-4 py-2 font-semibold text-white shadow-md active:scale-95"
              onClick={previewHandler}
            >
              <ViewfinderCircleIcon className="h-5" />
              <span>Preview</span>
            </button>
          </div>
        </form>

        {confirmModal && <ConfirmAdd setConfirmModal={setConfirmModal} />}
        {previewModal && (
          <PreviewModal setPreviewModal={setPreviewModal} data={dataPreview} />
        )}
      </section>
    </>
  );
};

export default FormArticle;
