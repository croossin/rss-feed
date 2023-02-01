import React, { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../common/Button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

function AddFeedModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const linkRef = useRef<HTMLInputElement | null>(null);
  const [rssUrl, setRssUrl] = useState("");
  const [rssTitle, setRssTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addRssFeed = async () => {
    setLoading(true);
    const { error } = await supabaseClient
      .from("links")
      .insert({
        link: rssUrl,
        user_id: user?.id,
        title: rssTitle ? rssTitle : null,
      });

    setRssTitle("");
    setRssUrl("");
    setLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.focus();
    }
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Add an RSS Feed
                      </Dialog.Title>
                      <div className="mt-8 flex flex-col space-y-6">
                        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-pink-600 focus-within:ring-1 focus-within:ring-pink-600">
                          <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
                          >
                            RSS URL
                          </label>
                          <input
                            ref={linkRef}
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
                            placeholder="https://roo.app/rss/feed.json"
                            value={rssUrl}
                            onChange={(e) => setRssUrl(e.target.value)}
                          />
                        </div>
                        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-pink-600 focus-within:ring-1 focus-within:ring-pink-600">
                          <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
                          >
                            Title (optional)
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-none"
                            value={rssTitle}
                            onChange={(e) => setRssTitle(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    className="ml-2"
                    disabled={rssUrl === ""}
                    loading={loading}
                    onClick={addRssFeed}
                  >
                    Add
                  </Button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddFeedModal;
