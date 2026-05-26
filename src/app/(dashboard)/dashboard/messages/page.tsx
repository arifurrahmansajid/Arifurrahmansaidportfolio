"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Search, Trash2, Calendar, User, Info, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { fetchWithTag } from "@/lib/fetchWithTag";

interface IMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithTag<IMessage[]>("/message", {
        tag: "messages",
      });
      setMessages(response.data ?? []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages from the backend.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      await fetchWithTag(`/message/${messageToDelete}`, { method: "DELETE" });
      toast({
        title: "Message deleted",
        description: "The message has been removed successfully.",
      });
      await loadMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Delete failed",
        description: "The message could not be deleted.",
        variant: "destructive",
      });
    } finally {
      setMessageToDelete(null);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(searchLower) ||
      msg.email.toLowerCase().includes(searchLower) ||
      msg.subject.toLowerCase().includes(searchLower) ||
      msg.message.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            Messages <span className="text-gray-500 font-light">Inbox</span>
          </h1>
          <p className="text-gray-400">View and manage messages sent from your portfolio website&apos;s contact form.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search messages by name, email, subject, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="glass-card overflow-hidden rounded-3xl border border-white/5">
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]" />
            <p className="mt-4 text-gray-500 font-medium tracking-widest uppercase text-xs">Accessing Database...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center">
                <Mail className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white">No messages found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              {searchQuery ? "Try refining your search terms." : "You haven't received any messages yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/[0.02] hover:bg-white/[0.02] border-white/5">
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Date</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Sender</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Subject</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Message Preview</TableHead>
                  <TableHead className="py-6 text-right text-gray-400 font-bold uppercase tracking-wider text-[10px]">Operations</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredMessages.map((msg, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={msg.id}
                    className="group border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <TableCell className="py-4 text-xs text-gray-400 font-medium">
                      {new Date(msg.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="font-bold text-white group-hover:text-primary transition-colors">{msg.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{msg.email}</p>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-sm font-semibold text-white truncate max-w-[200px]">{msg.subject}</p>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-xs text-gray-500 truncate max-w-[300px]">{msg.message}</p>
                    </TableCell>
                    <TableCell className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"
                          onClick={() => setSelectedMessage(msg)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-500"
                          onClick={() => setMessageToDelete(msg.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={Boolean(selectedMessage)} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-auto bg-[#15101E] border-white/10 rounded-3xl p-8 text-white">
          {selectedMessage && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  Message Details
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-3 w-3" /> Sender Name
                  </p>
                  <p className="text-sm font-bold">{selectedMessage.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> Sender Email
                  </p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm font-bold text-primary hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> Date Received
                  </p>
                  <p className="text-sm font-bold">
                    {new Date(selectedMessage.createdAt).toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="h-3 w-3" /> Subject
                </p>
                <h4 className="text-lg font-bold bg-white/5 p-3 rounded-xl border border-white/5">
                  {selectedMessage.subject}
                </h4>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Message Content</p>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 min-h-[150px] text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 px-6"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setMessageToDelete(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-none px-6"
                >
                  Delete Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={Boolean(messageToDelete)} onOpenChange={(open) => !open && setMessageToDelete(null)}>
        <AlertDialogContent className="bg-[#15101E] border-white/10 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-white">Permanently Delete Message?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action will erase the contact message from the database forever. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              onClick={() => setMessageToDelete(null)}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Keep Message
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
